import {
   Button,
   Input,
   MenuItem,
   Paper,
   Select,
   Table,
   TableBody,
   TableCell,
   TableFooter,
   TableHead,
   TablePagination,
   TableRow,
   Typography,
} from "@material-ui/core";
import Tabs, { TabPane } from "rc-tabs";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Navbar from "components/Navbar/Navbar.view";
import Footer from "components/Footer/Footer.view";
import { useAuth } from "contexts/auth.context";
import { normalizeCurrency } from "utils/split-currency";

function Setoran(props: SetoranProps) {
   const [active, setActive] = useState("setoran-wajib");
   return (
      <div>
         <Navbar />
         <Tabs
            className="setoran-view"
            activeKey={active}
            onChange={(k) => setActive(k)}
            style={{
               marginTop: "1rem",
               width: "90%",
               marginLeft: "auto",
               marginRight: "auto",
            }}
         >
            <Tabs.TabPane key="setoran-wajib" tab="Setoran Wajib">
               <SetoranTable type="wajib" />
            </Tabs.TabPane>
            <Tabs.TabPane key="setoran-pokok" tab="Setoran Pokok">
               <SetoranTable type="pokok" />
            </Tabs.TabPane>
         </Tabs>
         <Footer />
      </div>
   );
}

export default Setoran;

export interface SetoranProps {}

function SetoranTable({ type }: SetoranTableProps) {
   const auth = useAuth();
   const url = "/setoran-" + type;
   const [members, setMembers] = useState([]);
   const [datas, setData] = useState([]);
   const [pageable, setPageable] = useState<Pageable>({
      page: 0,
      size: 7,
      total: 0,
   });

   const currentDate = new Date();
   const [filter, setFilter] = useState<SetoranFilter>({
      member: null,
      bulan: null,
      tahun: null,
   });

   const setFilterData = useCallback(
      <T extends keyof SetoranFilter>(k: T, v: SetoranFilter[T]) => {
         const t =
            k === "bulan"
               ? setDefaultValue(v, null)
               : k === "tahun"
               ? setDefaultValue(v, null)
               : setDefaultValue(v, null);

         setFilter((p) => ({ ...p, [k]: t }));
      },
      [filter]
   );

   const onPageChange = useCallback(
      (page = 0) => {
         const params = { page, size: pageable.size, ...filter };

         console.log("Params: %o", params);

         Kopana.get(url, {
            params,
         }).then((res) => {
            console.log(res.data);
            setData(res.data.data);
            setPageable({
               page: res.data.page,
               size: res.data.size,
               total: res.data.total,
            });
         });
      },
      [pageable, filter]
   );

   useEffect(() => {
      if (auth.isLogin) {
         Kopana.get("/member").then((res) => {
            setMembers(res.data.data);
            Kopana.get(url, {
               params: { page: pageable.page, size: pageable.size },
            }).then((res) => {
               setData(res.data.data);
               setPageable({
                  page: +res.data.page,
                  size: +res.data.size,
                  total: +res.data.total,
               });
            });
         });
      }
   }, []);

   const totalSaldo =
      datas.length > 0
         ? datas
              .map((e) => e.saldo)
              .reduce((a, b) => {
                 const saldoA = a ?? 0;
                 const saldoB = b ?? 0;
                 return saldoA + saldoB;
              })
         : 0;

   return (
      <>
         <div className="table-filter">
            <Select
               label="Member"
               defaultValue={"all"}
               value={filter.member || "all"}
               onChange={(e) =>
                  setFilterData("member", e.target.value as any)
               }
            >
               <MenuItem value={"all"}>
                  <em>All</em>
               </MenuItem>
               {members.map((e) => (
                  <MenuItem key={"filter-name:" + e.nama} value={e._id}>
                     {e.nama} - {e.nomerPegawaiPertamina}
                  </MenuItem>
               ))}
            </Select>
            <Select
               label="Bulan"
               defaultValue={"all"}
               value={filter.bulan || "all"}
               onChange={(e) =>
                  setFilterData("bulan", e.target.value as any)
               }
            >
               <MenuItem value={"all"}>
                  <em>bulan</em>
               </MenuItem>
               {Object.keys(Month)
                  .filter((e) => typeof Month[e] === "number")
                  .map((e) => {
                     return (
                        <MenuItem
                           key={"filter-month:" + Month[e]}
                           value={Month[e] + 1}
                        >
                           {e}
                        </MenuItem>
                     );
                  })}
            </Select>
            <Select
               label="Tahun"
               defaultValue={"all"}
               value={filter.tahun || "all"}
               onChange={(e) =>
                  setFilterData("tahun", e.target.value as any)
               }
            >
               <MenuItem value={"all"}>
                  <em>tahun</em>
               </MenuItem>
               {new Array(5)
                  .fill(currentDate.getFullYear())
                  .map((e, i) => {
                     const year = e - i;
                     return (
                        <MenuItem
                           key={"filter-month:" + year}
                           value={year}
                        >
                           {year}
                        </MenuItem>
                     );
                  })}
            </Select>
            <Button onClick={(e) => onPageChange(pageable.page)}>
               Search
            </Button>
            <Button
               onClick={(e) => {
                  setFilter({
                     bulan: null,
                     member: null,
                     tahun: null,
                  });
               }}
            >
               Reset
            </Button>
         </div>
         <Table className="table-setoran">
            <TableHead>
               <TableRow>
                  <TableCell className="col col-index">No.</TableCell>
                  <TableCell className="col col-name">Member</TableCell>
                  <TableCell className="col col-desc">Deskripsi</TableCell>
                  <TableCell className="col col-date">Tanggal</TableCell>
                  <TableCell className="col col-saldo">Saldo</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {datas.length === 0 && "No Data"}
               {datas.length > 0 &&
                  datas.map((data, index) => {
                     const date = new Date(data.tanggal);
                     const format = moment(date).format("DD-MM-YYYY");

                     return (
                        <TableRow key={`${type}-${index}`}>
                           <TableCell className="col col-index">
                              {index + 1}
                           </TableCell>
                           <TableCell className="col col-name">
                              {data.memberId.nama}
                           </TableCell>
                           <TableCell className="col col-desc">
                              {data.deskripsi}
                           </TableCell>
                           <TableCell className="col col-date">
                              {format}
                           </TableCell>
                           <TableCell className="col col-saldo">
                              Rp. {normalizeCurrency(data.saldo || 0)}
                           </TableCell>
                        </TableRow>
                     );
                  })}
            </TableBody>
            <TableFooter>
               <TableRow>
                  <TablePagination
                     colSpan={3}
                     component={"td"}
                     count={pageable.total}
                     rowsPerPage={pageable.size}
                     page={pageable.page}
                     onPageChange={(e, v) => onPageChange(v)}
                  />
                  <TableCell>Total Saldo: </TableCell>
                  <TableCell>Rp. {normalizeCurrency(totalSaldo)}</TableCell>
               </TableRow>
            </TableFooter>
         </Table>
      </>
   );
}

interface SetoranTableProps {
   type: "wajib" | "pokok";
}

interface Pageable {
   page?: number;
   size?: number;
   sort?: `${string},${"asc" | "des"}`;
   total?: number;
}
interface SetoranFilter {
   member: string;
   bulan: number;
   tahun: number;
}

enum Month {
   Januari,
   Februari,
   Maret,
   April,
   Mei,
   Juni,
   Juli,
   Agustus,
   September,
   Oktober,
   November,
   Desember,
}

function setDefaultValue(v: any, def: any) {
   return v === "all" ? def : v;
}