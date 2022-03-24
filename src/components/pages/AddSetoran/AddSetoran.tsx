/// <reference path="../../../react-app-env.d.ts" />
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tabs from "rc-tabs";
import { TabListSetoran } from "components/Setoran/tab-list-setoran";

const AddSetoran = () => {
   const [member, setMember] = useState([]);
   const [selectMember, setSelectember] = useState("");
   const [tanggal, setTanggal] = useState("");
   const [deskripsi, setDeskripsi] = useState("");
   const [loading, setIsLoading] = useState(true);

   async function validateForm() {
      return tanggal.length > 0 && deskripsi.length > 0;
   }

   useEffect(() => {
      Kopana.get("/member").then((response) => {
         setMember(response.data.data);
         setIsLoading(false);
      });
   }, []);

   async function handleSubmit(event) {
      event.preventDefault();
      if (selectMember === "test" || selectMember === "") {
         alert("Silangkah Pilih member");
      } else {
         const data = {
            tanggal: tanggal,
            deskripsi: deskripsi,
            memberId: selectMember,
         };

         const res = await Kopana.post("/setoran-wajib", data);
         console.log(res);
      }
   }

   const unused = () =>
      loading ? (
         <>Loading</>
      ) : (
         <div>
            <Form onSubmit={handleSubmit}>
               <Form.Group size="lg" controlId="member">
                  <Form.Label style={{ marginRight: "10px" }}>
                     Member
                  </Form.Label>
                  <Form.Control
                     as="select"
                     // defaultValue={member[0]._id}
                     onChange={(e) => setSelectember(e.target.value)}
                  >
                     <option value="test">Silahkan Pilih member</option>
                     {member.map((d) => (
                        <option key={d._id} value={d._id}>
                           {d.nama}
                        </option>
                     ))}
                  </Form.Control>
               </Form.Group>
               <Form.Group size="lg" controlId="tanggal">
                  <Form.Label style={{ marginRight: "10px" }}>
                     tanggal
                  </Form.Label>
                  {/* <input type={'datetime-local'} /> */}
                  <Form.Control
                     autoFocus
                     type="datetime-local"
                     value={tanggal}
                     onChange={(e) => setTanggal(e.target.value)}
                  />
               </Form.Group>
               <Form.Group size="lg" controlId="password">
                  <Form.Label style={{ marginRight: "10px" }}>
                     desskripsi
                  </Form.Label>
                  <Form.Control
                     type="text"
                     value={deskripsi}
                     onChange={(e) => setDeskripsi(e.target.value)}
                  />
               </Form.Group>
               <Button
                  style={{ marginTop: "10px" }}
                  size="lg"
                  type="submit"
                  disabled={!validateForm()}
               >
                  input
               </Button>
            </Form>
         </div>
      );

   if (loading) return null;

   return unused();
   // return (
   //    <Tabs
   //       defaultActiveKey="add-setoran"
   //       direction="ltr"
   //       tabPosition="top"
   //       prefix="st"
   //    >
   //       <Tabs.TabPane tab="List Setoran" key="list-setoran">
   //          <TabListSetoran />
   //       </Tabs.TabPane>
   //       <Tabs.TabPane tab="Tambah Setoran" key="add-setoran">
   //          Hello 2
   //       </Tabs.TabPane>
   //    </Tabs>
   // );
};

export default AddSetoran;

function SelectMembers() {
   return Kopana.get("/member");
}
