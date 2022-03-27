import { useState } from "react";
import { useToasts } from 'react-toast-notifications'
import Button from '../Button/Button.view'
import { CheckButton } from '../Button/CheckButton'
import { KopanaApi } from "api";

import './FormPeminjaman.styled.css';

const FormPeminjaman = (props) => {
  const [alamatRumah, setAlamatRumah] = useState("");
  const [alamatPangkalan, setAlamatPangkalan] = useState("");
  const [nama, setNama] = useState("");
  const [setuju, setSetuju] = useState({
    perjanjian: false,
    mematuhi: false
  });
  const [ktp, setKtp] = useState([]);
  const [keteranganUsaha, setKeteranganUsaha] = useState([]);
  const [suratTeraTimbangan, setSuratTeraTimbangan] = useState([]);
  const [kelengkapanSarana, setkelengkapanSarana] = useState([])
  const { addToast } = useToasts();
  const AddFormData = async (e) => {
    e.preventDefault();

    if (!setuju.mematuhi) addToast('Anda harus setuju untuk mematuhi peraturan yang ada!', {
      appearance: 'error'
    });

    if (!setuju.perjanjian) addToast('Anda harus setuju untuk mematuhi peraturan yang ada!', {
      appearance: 'error'
    });

    const formData = new FormData();
    formData.append('nama', nama)
    formData.append('alamatRumah', alamatRumah)
    formData.append('alamatPangkalan', alamatPangkalan)
    formData.append('imageKeteranganUsaha', keteranganUsaha)
    formData.append('imageSuratTeraTimbangan', suratTeraTimbangan)
    formData.append('imageKelengkapanSarana', kelengkapanSarana)
    formData.append('imageKtp', ktp)

    const res = await KopanaApi.post('/formulir', formData)
    if (res.status == 200) {
      addToast("berhasil!", {
        appearance: 'success',
        autoDismiss: true,
      })
    }
  };

  return (
    <div className="containerForm">
      <form onSubmit={AddFormData}>
        <h2
          for="judul"
          class="col-sm-2 col-form-label"
          style={{ textAlign: "center" }}
        >
          Formulir Pengajuan Menjadi Pangkalan Gas
        </h2>
        <br />
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
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="alamatRumah" class="col-sm-2 col-form-label">
            Alamat Rumah
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="alamatRumah"
              className="inputan"
              value={alamatRumah}
              onChange={(e) => setAlamatRumah(e.target.value)}
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="alamatPangkalan" class="col-sm-2 col-form-label">
            Alamat Pangkalan
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="alamatPangkalan"
              className="inputan"
              value={alamatPangkalan}
              onChange={(e) => setAlamatPangkalan(e.target.value)}
            />
          </div>
        </div>
        <CheckButton
          name="check-perjanjian"
          value={setuju.perjanjian}
          onChange={(v) => setSetuju(e => ({ ...e, perjanjian: v }))}
        >
          Mengajukan permohonan untuk di buatkan Perjanjian Pangkalan
          berdasarkan alamat di atas.
        </CheckButton>
        <div className="form-group containerDropzone" style={{ marginTop: "10px" }}>
          <span for="myfile">Upload Foto KTP : </span>
          <input
            type="file"
            onChange={(e) => setKtp(e.target.files[0])}
          />
          <br />
        </div>
        <div className="form-group containerDropzone" style={{ marginTop: "10px" }}>
          <span for="myfile">Surat Keterangan Usaha : </span>
          <input
            type="file"
            onChange={(e) => setKeteranganUsaha(e.target.files[0])}
          />
          <br />
        </div>
        <div className="form-group containerDropzone" style={{ marginTop: "10px" }}>
          <span for="myfile">Surat Tera Timbangan LPG 3 kg : </span>
          <input
            type="file"
            onChange={(e) => setSuratTeraTimbangan(e.target.files[0])}
          />
          <br />
        </div>
        <div className="form-group containerDropzone" style={{ marginTop: "10px" }}>
          <span for="myfile">
            Foto kelengkapan sarana dan fasilitas pangkalan :{" "}
          </span>
          <input
            type="file"
            onChange={(e) => setkelengkapanSarana(e.target.files[0])}
          />
          <br />
        </div>
        <CheckButton
          name="check-mematuhi"
          value={setuju.mematuhi}
          onChange={(v) => setSetuju(e => ({ ...e, mematuhi: v }))}
        >
          Kami bersedia mematuhi segala peraturan yang diberikan KOPANA
          Bandung termasuk menjual
          <br />
          LPG 3 kg sesuai dengan Harga Eceran Tertinggi (HET) yang diberikan
          oleh Pemda Setempat.
        </CheckButton>
        <br />

        <div className="form-group row">
          <Button type="submit">
            Simpan Transaksi
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPeminjaman;
