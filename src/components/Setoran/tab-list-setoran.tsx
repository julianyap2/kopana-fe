import { TabPane } from "rc-tabs";
import Table from "@material-ui/core/Table";
import THead from "@material-ui/core/TableHead";
import TBody from "@material-ui/core/TableBody";
import TCell from "@material-ui/core/TableCell";
import TRow from "@material-ui/core/TableRow";
import { useAuth } from "contexts/auth.context";
import { useEffect, useState } from "react";

export function TabListSetoran() {
   const auth = useAuth();
   const [members, setMembers] = useState([]);

   useEffect(() => {
      Kopana.get("/member").then((res) => {
         console.log(res.data);
         setMembers(res.data);
      });

   }, []);

   if(members.length === 0) return null;

   return (
      <Table>
         <THead></THead>
         <TBody></TBody>
      </Table>
   );
}
