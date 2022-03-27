import React, { useState, useEffect } from "react";
import Tabs, { TabPane } from "rc-tabs";
import { useToasts } from 'react-toast-notifications'
import Button from "../Button/Button.view";

import "rc-tabs/assets/index.css";
import "./Setting.styled.scss";
import { classNames } from "../../utils/merge-classname";
import { useAuth } from "../../contexts/auth.context";

const Setting = () => {
   const auth = useAuth();
   const toast = useToasts();
   const [name, setName] = useState("");
   const [noKtp, setNoKtp] = useState("");
   const [noPegawai, setNoPegawai] = useState("");
   const [noAnggota, setNoAnggota] = useState("");
   const [email, setEmail] = useState("");
   const [selectedFile, setSelectedFile] = useState();
   const [preview, setPreview] = useState<string>();
   const [selected, setSelected] = useState();
   const [view, setView] = useState<string>();
   const [noDihubungi, setNoDihubungi] = useState("");
   const [tanggalLahir, setTanggalLahir] = useState("");
   const [oldPassword, setOldPassword] = useState("");
   const [password, setPassword] = useState("");
   const [confirmpassword, setConfirmPassword] = useState("");
   const [test, setTest] = useState({});
   const [loading, setIsLoading] = useState(true);

   useEffect(() => {
      if (!selectedFile) {
         setPreview(undefined);
         return;
      }
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
   }, [selectedFile]);

   const onSelectFile = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
         setSelectedFile(undefined);
         return;
      }
      setSelectedFile(e.target.files[0]);
   };

   useEffect(() => {
      if (!selected) {
         setView(null);
         return;
      }
      const objectUrl = URL.createObjectURL(selected);
      setView(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
   }, [selected]);

   const onSelect = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
         setSelected(null);
         return;
      }
      setSelected(e.target.files[0]);
   };

   const getUser = async () => {
      try {
         let tes = JSON.parse(localStorage.getItem("user"));
         // console.log(tes.id);
         const response = await Kopana.get(`/member/${tes.id}`);
         console.log(response.data);
         setTest(response.data);
         setName(response.data.nama);
         setEmail(response.data.email);
         setNoPegawai(response.data.nomerPegawaiPertamina);
         setNoAnggota(
            response.data.nomerAnggota ? response.data.nomerAnggota : ""
         );
         setNoKtp(response.data.noKtp ? response.data.noKtp : "");
         setTanggalLahir(
            response.data.tanggalLahir ? response.data.tanggalLahir : ""
         );
         setNoDihubungi(response.data.nomerTelepon);
         setIsLoading(false);

      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      getUser();
   }, []);

   const submit = async (event) => {
      event.preventDefault();
      let tes = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      formData.append("id", tes.id);
      formData.append("fotoProfile", selectedFile);
      formData.append("imageKtp", selected);
      formData.append("nama", name);
      formData.append("email", email);
      formData.append("nomerAnggota", noAnggota);
      formData.append("nomerTelepon", noDihubungi);
      formData.append("nomerPegawaiPertamina", noPegawai);
      formData.append("noKtp", noKtp);
      formData.append("tanggalLahir", tanggalLahir);
      const res = await Kopana.put("/member", formData);
      if (Kopana.isStatus200ish(res.status)) {
         toast.addToast('Berhasil mengupdate profile!', {
            appearance: 'success',
            autoDismiss: true,
         })
      }
   };

   const changePass = async (event) => {
      event.preventDefault();
      let tes = JSON.parse(localStorage.getItem("user"));
      const data = {
         oldPassword: oldPassword,
         newPassword: password,
         confirmNewPassword: confirmpassword,
      };
      const res = await Kopana.put(`/update-password/${tes.idUser}`, data);
      console.log(res);
   };

   const InputClassName = classNames("form-control", "inputan");

   return loading ? (
      "Loading"
   ) : (
      <div>
         <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            tabBarGutter={20}
            style={{ margin: "20px 20px" }}
         >
            <TabPane tab="Profile" key="1">
               <div style={{ height: "60vh" }}>
                  <form>
                     <h2 style={{ margin: "0 100px" }}>Profile</h2>
                     <br />
                     <br />
                     <div
                        className="form-group row"
                     >
                        <span>Foto</span>
                        <div
                           className="col-sm-10"
                           style={{
                              display: "flex",
                              alignItems: "center",
                           }}
                        >
                           {selectedFile && (
                              <img
                                 src={preview}
                                 width={"75px"}
                                 height={"75px"}
                              />
                           )}
                           <input type="file" onChange={onSelectFile} />
                        </div>
                     </div>
                     <div className="form-group row">
                        <br />
                        <label
                           htmlFor="namaLengkap"
                           className="col-sm-2 col-form-label"
                        >
                           Nama Lengkap
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="text"
                              id="namaLengkap"
                              className={InputClassName}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">
                           Email
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="text"
                              id="email"
                              className={InputClassName}
                              value={email}
                              disabled
                              onChange={(e) => setEmail(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label
                           htmlFor="noPegawai"
                           className="col-sm-2 col-form-label"
                        >
                           No. Anggota
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="text"
                              className={InputClassName}
                              id="noPegawai"
                              value={noAnggota}
                              onChange={(e) =>
                                 setNoAnggota(e.target.value)
                              }
                           />
                        </div>
                     </div>
                  </form>
               </div>
            </TabPane>
            <TabPane
               tab="Data Pribadi"
               key="2"
               style={{ paddingRight: "5px" }}
            >
               <div style={{ height: "60vh" }}>
                  <form>
                     <h2 style={{ margin: "0 100px" }}>Data Pribadi</h2>

                     <div className="form-group row">
                        <label
                           htmlFor="noDihubungi"
                           className="col-sm-2 col-form-label"
                        >
                           Nomor Telepon
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="text"
                              id="noDihubungi"
                              className={InputClassName}
                              value={noDihubungi}
                              onChange={(e) =>
                                 setNoDihubungi(e.target.value)
                              }
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label
                           htmlFor="noPegawai"
                           className="col-sm-2 col-form-label"
                        >
                           No. Pegawai Pertamina
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="text"
                              className={InputClassName}
                              id="noPegawai"
                              value={noPegawai}
                              disabled
                              onChange={(e) =>
                                 setNoPegawai(e.target.value)
                              }
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="noKtp" className="col-sm-2 col-form-label">
                           NIK / No. KTP
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="text"
                              className={InputClassName}
                              id="noKtp"
                              value={noKtp}
                              onChange={(e) => setNoKtp(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label
                           htmlFor="tanggalLahir"
                           className="col-sm-2 col-form-label"
                        >
                           Tanggal Lahir
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="text"
                              className={InputClassName}
                              id="tanggalLahir"
                              value={tanggalLahir}
                              onChange={(e) =>
                                 setTanggalLahir(e.target.value)
                              }
                           />
                        </div>
                     </div>
                     <br />
                     <br />

                     <div className="form-group">
                        <label htmlFor="upload-ktp">
                           Upload Foto KTP
                        </label>
                        {selected && (
                           <img
                              src={view}
                              width={"75px"}
                              height={"75px"}
                           />
                        )}
                        <input name="upload-ktp" multiple={false} type="file" onChange={onSelect} />
                     </div>

                     <div className="form-group">
                        <Button type="submit" style={{ float: 'right' }} onClick={submit}>
                           Simpan Perubahan
                        </Button>
                     </div>

                  </form>
               </div>
            </TabPane>
            <TabPane tab="Akun" key="3">
               <div style={{ height: "60vh" }}>
                  <form>
                     <h2 style={{ margin: "0 100px", marginTop: "60px" }}>
                        Ubah Password
                     </h2>
                     <div className="form-group row">
                        <label
                           htmlFor="password"
                           className="col-sm-2 col-form-label"
                        >
                           Password Lama
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="password"
                              id="old-password"
                              className={InputClassName}
                              value={oldPassword}
                              onChange={(e) =>
                                 setOldPassword(e.target.value)
                              }
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label
                           htmlFor="password"
                           className="col-sm-2 col-form-label"
                        >
                           Password Baru
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="password"
                              id="password"
                              className="form-control inputan"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label
                           htmlFor="password"
                           className="col-sm-2 col-form-label"
                        >
                           Konfirmasi Password
                        </label>
                        <div className="col-sm-10">
                           <input
                              type="password"
                              id="password"
                              className={InputClassName}
                              value={confirmpassword}
                              onChange={(e) =>
                                 setConfirmPassword(e.target.value)
                              }
                           />
                        </div>
                     </div>

                     <div className="form-group row">
                        <Button
                           type="submit"
                           size="small"
                           onClick={changePass}
                        >
                           Ubah Password
                        </Button>
                        <Button link={"/"} style={{ float: "right" }} onClick={async () => {
                           await auth.Logout();
                           window.location.reload();
                        }}>
                           Logout
                        </Button>
                     </div>
                  </form>
               </div>
            </TabPane>
         </Tabs>
      </div>
   );
};

export default Setting;