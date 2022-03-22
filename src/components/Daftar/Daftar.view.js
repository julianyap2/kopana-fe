import axios from "axios";
import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import './Daftar.styled.css';
import iziToast from "izitoast";
import { useToasts } from 'react-toast-notifications'


const Daftar = () => {
  const [name, setName] = useState("");
  const [noPegawai, setNoPegawai] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [noDihubungi, setNoDihubungi] = useState("");
  const [setuju, setSetuju] = useState("");
  const [kartuPertamina, setKartuPertamina] = useState([])
  const { addToast } = useToasts();

  const AddFormData = async (e) => {
    e.preventDefault();
    const url = "http://192.168.43.77:3000/api/v1/signUp"
    const data ={
      nama: name,
      password: password,
      alamat: address1,
      email: email,
      noPegawaiPertamina: noPegawai,
      noTlpn: noDihubungi,
    }
    const res = await axios.post(url, data)
    console.log(res);
    // FormData({ name, noPegawai, email, address1, noDihubungi, setuju,password });
    // setName("");
    // setNoDihubungi("");
    // setNoPegawai("");
    // setAddress1("");
    // setEmail("");
    // setPassword("");
    // setSetuju(false);

    if (res.status == 200) {
      addToast("berhasil!", {
        appearance: 'success',
        autoDismiss: true,
       })
      window.open('/login','_self')
    }
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*" });

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <form onSubmit={AddFormData}>
      <h2 style={{textAlign:'center',marginTop:'30px'}}>Daftar Menjadi Anggota</h2>
      <div className="containers">
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">
          Nama
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="name"
            className="inputan"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="Address1" class="col-sm-2 col-form-label">
          Alamat
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="Address1"
            className="inputan"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">
          Email
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="email"
            className="inputan"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="passowrd" class="col-sm-2 col-form-label">
          Password
        </label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="password"
            className="inputan"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="noPegawai" class="col-sm-2 col-form-label">
          No. Pegawai Pertamina
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            className="inputan"
            id="noPegawai"
            value={noPegawai}
            onChange={(e) => setNoPegawai(e.target.value)}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="noDihubungi" class="col-sm-2 col-form-label">
          Nomor yang Dapat Dihubungi
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="noDihubungi"
            className="inputan"
            value={noDihubungi}
            onChange={(e) => setNoDihubungi(e.target.value)}
          />
        </div>
      </div>
      <div class="form-group row">
        <input
          type="checkbox"
          class="form-control"
          id="setuju"
          value={setuju}
          onChange={(e) => setSetuju(e.target.value)}
        />
        <label for="setuju" class="col-sm-2 col-form-label">
          Saya Setuju Untuk Menjadi Anggota KOPANA Bandung
        </label>
      </div>
      <button type="submit" class="btn btn-primary" style={{marginTop:'10px'}}>
        Submit
      </button>
      </div>
    </form>
  );
};

export default Daftar;
