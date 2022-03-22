import React from 'react';
import './SyaratPangkalan.styled.css'
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.view';

const SyaratPangkalan = () => {

    return (
      <div className='containerSyaratPangkalan'>
        <h2
          for="judul"
          class="col-sm-2 col-form-label"
          style={{ textAlign: "center" ,marginTop:'25px'}}
        >
          Syarat Menjadi Pangkalan
        </h2>
        <ul className='isiSyaratPangkalan'>
          <li>Membuat permohonan menjadi pangkalan</li>
          <li>Memiliki perijinan (Surat Keterangan Usaha dan NIB)</li>
          <li>Memiliki tabung sejumlah alokasi + rolling</li>
          <li>Memiliki apar, papan nama pangkalan, bak tes kebocoran, spanduk pelaporan, spanduk harga, rambu-rambu larangan.</li>
          <li>Menandatangani kontrak pangkalan</li>
          <li>Memiliki ID Pangkalan</li>
          <li>Menjadi nasabah bank Mandiri aktif sebagai cara untuk penebusan melalui sistem alokasi harian yang terkoneksi dengan MSC (Mandiri Supply Chain) dan Pertamina.</li>
        </ul>
        <Link to='/pangkalan'>
          <button style={{margin:'20px 40%',width:'150px',height:'50px'}}>
            Daftar Menjadi Pangkalan
          </button>
        </Link>

      </div>
    );
}


export default SyaratPangkalan