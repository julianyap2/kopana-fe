import React, { useState, useEffect } from "react";
import Tabs, { TabPane } from "rc-tabs";
import "rc-tabs/assets/index.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import iziToast from "izitoast";
import { useAuth } from "contexts/auth.context";

const Setting = () => {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [noKtp, setNoKtp] = useState("");
  const [noPegawai, setNoPegawai] = useState("");
  const [noAnggota, setNoAnggota] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [selected, setSelected] = useState();
  const [view, setView] = useState();
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
      setView(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selected);
    setView(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selected]);

  const onSelect = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelected(undefined);
      return;
    }
    setSelected(e.target.files[0]);
  };

  function callback(e) {
    console.log(e);
  }
  const getUser = async () => {
    try {
      let tes = JSON.parse(localStorage.getItem("user"));
      // console.log(tes.id);
      const response = await Kopana.get(
        `/member/${tes.id}`
      );
      console.log(response.data);
      setTest(response.data);
      setName(response.data.nama);
      setEmail(response.data.email);
      setNoPegawai(response.data.nomerPegawaiPertamina);
      setNoAnggota(response.data.nomerAnggota ? response.data.nomerAnggota : "");
      setNoKtp(response.data.noKtp ? response.data.noKtp : "");
      setTanggalLahir(response.data.tanggalLahir ? response.data.tanggalLahir : "")
      setNoDihubungi(response.data.nomerTelepon);
      setIsLoading(false);
      if (response.status == 200) {
        iziToast.success({
          title: 'Berhasil',
          message: 'Berhasil Mengganti Data',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    let tes = JSON.parse(localStorage.getItem("user"))
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
    const res = await Kopana.put('/member', formData);
    console.log(res);
  };

  const changePass = async (event) => {
    event.preventDefault();
    let tes = JSON.parse(localStorage.getItem("user"))
    const data = {
      oldPassword: oldPassword,
      newPassword: password,
      confirmNewPassword: confirmpassword
    }
    const res = await Kopana.put(`/update-password/${tes.idUser}`, data);
    console.log(res);
  }

  return loading ? (
    "Loading"
  ) : (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={callback}
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
              <span style={{ margin: "0 100px" }}>Foto</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 100px",
                }}
              >
                {selectedFile && (
                  <img src={preview} width={"75px"} height={"75px"} />
                )}
                <input type="file" onChange={onSelectFile} />
              </div>
              <div class="form-group row">
                <br />
                <label
                  for="namaLengkap"
                  style={{ marginLeft: "100px" }}
                  class="col-sm-2 col-form-label"
                >
                  Nama Lengkap
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="namaLengkap"
                    className="inputan"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="email"
                  style={{ marginLeft: "100px" }}
                  class="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    className="inputan"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="noPegawai"
                  style={{ marginLeft: "100px" }}
                  class="col-sm-2 col-form-label"
                >
                  No. Anggota
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    className="inputan"
                    id="noPegawai"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={noAnggota}
                    onChange={(e) => setNoAnggota(e.target.value)}
                  />
                </div>
              </div>
              {/* <button
                    type="submit"
                    class="btn btn-primary"
                    style={{ marginTop: "10px", marginLeft: "100px" }}
                  >
                    Simpan Perubahan
                  </button> */}
            </form>
          </div>
        </TabPane>
        <TabPane tab="Data Pribadi" key="2" style={{ paddingRight: "5px" }}>
          <div style={{ height: "60vh" }}>
            <form>
              <h2 style={{ margin: "0 100px" }}>Data Pribadi</h2>

              <div class="form-group row">
                <label
                  for="noDihubungi"
                  style={{ marginLeft: "100px" }}
                  class="col-sm-2 col-form-label"
                >
                  Nomor Telepon
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="noDihubungi"
                    className="inputan"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={noDihubungi}
                    onChange={(e) => setNoDihubungi(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="noPegawai"
                  style={{ marginLeft: "100px" }}
                  class="col-sm-2 col-form-label"
                >
                  No. Pegawai Pertamina
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    className="inputan"
                    id="noPegawai"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={noPegawai}
                    onChange={(e) => setNoPegawai(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="noKtp"
                  style={{ marginLeft: "100px" }}
                  class="col-sm-2 col-form-label"
                >
                  NIK / No. KTP
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    className="inputan"
                    id="noKtp"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={noKtp}
                    onChange={(e) => setNoKtp(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="tanggalLahir"
                  style={{ marginLeft: "100px" }}
                  class="col-sm-2 col-form-label"
                >
                  Tanggal Lahir
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    className="inputan"
                    id="tanggalLahir"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <br />
              <span style={{ margin: "0 100px" }}>Upload Foto KTP</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 100px",
                }}
              >
                {selected && <img src={view} width={"75px"} height={"75px"} />}
                <input type="file" onChange={onSelect} />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                style={{ marginTop: "10px", marginLeft: "100px" }}
                onClick={submit}
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </TabPane>
        <TabPane tab="Akun" key="3">
          <div style={{ height: "60vh" }}>
            <form>
              <h2 style={{ margin: "0 100px", marginTop: "60px" }}>
                Ubah Password
              </h2>
              <div class="form-group row">
                <label
                  for="password"
                  style={{ marginLeft: "100px", marginTop: "30px" }}
                  class="col-sm-2 col-form-label"
                >
                  Password Lama
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    class="form-control"
                    id="old-password"
                    className="inputan"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="password"
                  style={{ marginLeft: "100px", marginTop: "30px" }}
                  class="col-sm-2 col-form-label"
                >
                  Password Baru
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    className="inputan"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="password"
                  style={{ marginLeft: "100px" }}
                  class="col-sm-2 col-form-label"
                >
                  Konfirmasi Password
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    className="inputan"
                    style={{ marginLeft: "100px", width: "80%" }}
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                style={{ marginTop: "10px", marginLeft: "100px" }}
                onClick={changePass}
              >
                Ubah Password
              </button>
              <Link to='/'>
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ marginTop: "10px", marginLeft: "485px" }}
                  onClick={auth.Logout}
                >
                  Logout
                </button>
              </Link>
            </form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Setting;
