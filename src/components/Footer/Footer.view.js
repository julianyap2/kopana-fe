import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button.view.js";
import { Link } from "react-router-dom";
import "./Footer.styled.css";
import iconWa from '../../iconwhatsapp.png';
import iconGmail from '../../icongmail.png';


const Footer = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <div class="wrapper">
        <div className='leftFooter'>
          <b>Tentang Kami</b>
          <p>
            <Link to='/beranda'>FAQ</Link>
            <br/>
            <Link to='/pangkalan'>Pangkalan</Link>
            <br/>
            <Link to='/SyaratPangkalan'>Syarat Pangkalan</Link>
            <br/>
            <Link to='/tentang-kami'>Tentang Kami</Link>
            <br/>
          </p>
        </div>
        <div className='midFooter'>
          <b>Koperasi Pensiunan Pertamina</b>
          <p>
            Jl. Parakan Saat No. 57 Kelurahan
            <br />
            Antapani Tengah Kecamatan
            <br />
            Antapani - Kota Bandung 40291
          </p>
        </div>
        <div className='rightFooter'>
          <b>Hubungi Kami</b>
          <br/>
          <br/>
          <a href=' https://wa.me/62811245238'>
            <img src={iconWa} alt="iconWhatsapp" className='icon'/>
          </a>
          <a href='mailto:kopanabandung@gmail.com'>
          <img src={iconGmail} alt="iconGmail" className='icon'/>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
