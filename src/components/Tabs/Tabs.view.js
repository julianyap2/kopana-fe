import { useEffect } from "react";
import { useState } from "react";
import moment from 'moment'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@material-ui/core";
import { classNames } from "../../utils/merge-classname";
import { normalizeCurrency } from "../../utils/split-currency";

import "./Tabs.styled.css";

function TabGroup() {
  const [toggleState, toggleTab] = useState(1);
  const [test, setTest] = useState({})
  const [loading, setIsLoading] = useState(true)

  const getUser = async () => {
    try {
      let tes = JSON.parse(localStorage.getItem("user"))
      const response = await Kopana.get(`/member/${tes.id}`);
      console.log(response.data);
      setTest(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  // classNames
  return loading ? "Loading" : (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Setoran Pokok
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Setoran Wajib
        </button>
      </div>

      <div className="content-tabs">
        <TableSetoran active={toggleState === 1} data={test.setoranPokokId} />
        <TableSetoran active={toggleState === 2} data={test.setoranId} />
      </div>
    </div>
  );
}

export default TabGroup;

/**
 * 
 * @param {object} props 
 * @param {object[]} props.data
 * @param {boolean} [props.active]
 */
function TableSetoran(props) {
  const { data, active = false } = props;
  const totalSaldo = data.map(e => e.saldo || 0);

  const className = classNames('content', {
    'active-content': active === true
  });
  return <div className={className}>
    <Table className="table-setoran">
      <TableHead>
        <TableRow>
          <TableCell style={{ width: 80 }}>No</TableCell>
          <TableCell style={{ width: 300 }}>Tanggal</TableCell>
          <TableCell>Keterangan</TableCell>
          <TableCell style={{ width: 150 }}>Saldo</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((d, index) => {
          return <TableRow key={"profile-setoran:" + index}>
            <TableCell>{index + 1}.</TableCell>
            <TableCell>{moment(d.tanggal).format("DD-MM-YYYY")}</TableCell>
            <TableCell>{d.deskripsi}</TableCell>
            <TableCell>Rp. {normalizeCurrency(d.saldo || 0)}</TableCell>
          </TableRow>
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Saldo</TableCell>
          <TableCell>Rp. {
            normalizeCurrency(totalSaldo.length > 0 ? totalSaldo.reduce((a, b) => a + b) : 0)
          }</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
}