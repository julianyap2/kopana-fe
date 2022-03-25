import { useCallback, useEffect, useState } from "react";
import {
   Box,
   Button,
   FormControl,
   Input,
   InputLabel,
   MenuItem,
   Select,
   TextField,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import Tabs from "rc-tabs";
import Footer from "components/Footer/Footer.view";
import Navbar from "components/Navbar/Navbar.view";

import "./setoran.style.scss";

function FormSetoranPage() {
   const [active, setActive] = useState("setoran-wajib");

   return (
      <div>
         <Navbar />
         <Tabs
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
               <FormSetoran type="wajib" />
            </Tabs.TabPane>
            <Tabs.TabPane key="setoran-pokok" tab="Setoran Pokok">
               <FormSetoran type="pokok" />
            </Tabs.TabPane>
         </Tabs>
         <Footer />
      </div>
   );
}

export default FormSetoranPage;

function FormSetoran({ type }: FormSetoranProps) {
   const toast = useToasts();
   const [members, setMembers] = useState([]);
   const [formData, setFormData] = useState<FormData>({
      member: "",
      tanggal: new Date(),
      setoran: 0,
      deskripsi: "",
   });

   const setData = useCallback(
      <T extends keyof FormData>(k: T, value: FormData[T]) => {
         setFormData((prev) => ({ ...prev, [k]: value }));
      },
      [setFormData]
   );
   const onSubmit = useCallback(
      (e: React.FormEvent) => {
         console.log(formData);
         e.preventDefault();
         const { member: memberId, setoran: saldo, ...rest } = formData;
         Kopana.post("/setoran-" + type, {
            memberId,
            saldo,
            ...rest,
         })
            .then((res) => {
               if (Kopana.isStatus200ish(res.status)) {
                  toast.addToast("Berhasil Ditambah!", {
                     appearance: "success",
                     autoDismiss: true,
                  });
               }
            })
            .catch((err) =>
               toast.addToast(err.message, {
                  appearance: "error",
                  autoDismiss: true,
               })
            );
      },
      [formData]
   );

   useEffect(() => {
      Kopana.get("/member").then((res) => {
         setMembers(res.data.data);
      });
   }, []);

   return (
      <Box component="form" className="form-setoran" onSubmit={onSubmit}>
         <FormControl
            className="form-group"
            variant="outlined"
            size="small"
         >
            <InputLabel htmlFor="member">Pilih Member</InputLabel>
            <Select
               id={"inp-member:" + type}
               name="member"
               required
               onChange={(e) => setData("member", e.target.value as any)}
            >
               <MenuItem value="">
                  <em>None</em>
               </MenuItem>
               {members.map((member, i) => {
                  const id = "kopana:member-" + i;
                  return (
                     <MenuItem key={id} value={member._id}>
                        {member.nama} - {member.nomerPegawaiPertamina}
                     </MenuItem>
                  );
               })}
            </Select>
         </FormControl>
         <FormControl
            className="form-group"
            variant="outlined"
            size="small"
         >
            {/* <InputLabel htmlFor="tanggal">Tanggal Setoran</InputLabel> */}
            <Input
               id={"inp-tanggal:" + type}
               name="tanggal"
               type="date"
               required
               placeholder=""
               onChange={(e) => setData("tanggal", e.target.value as any)}
            />
         </FormControl>
         <FormControl
            className="form-group"
            variant="outlined"
            size="small"
         >
            <InputLabel htmlFor="setoran">Setoran</InputLabel>
            <Input
               id={"inp-setoran:" + type}
               name="setoran"
               type="number"
               required
               onChange={(e) => setData("setoran", e.target.value as any)}
            />
         </FormControl>
         <FormControl
            className="form-group"
            variant="outlined"
            size="small"
         >
            {/* <InputLabel htmlFor="deskripsi">Deskripsi</InputLabel> */}
            <TextField
               id={"inp-deskripsi:" + type}
               name="deskripsi"
               multiline
               onChange={(e) =>
                  setData("deskripsi", e.target.value as any)
               }
            />
         </FormControl>
         <FormControl>
            <Button type="submit">Submit</Button>
         </FormControl>
      </Box>
   );
}

interface FormSetoranProps {
   type: "wajib" | "pokok";
}
interface FormData {
   member: string;
   tanggal: Date;
   setoran: number;
   deskripsi: string;
}
