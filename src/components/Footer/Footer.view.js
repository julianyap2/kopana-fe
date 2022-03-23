import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button.view.js";
import { Link } from "react-router-dom";
import iconWa from '../../iconwhatsapp.png';
import iconGmail from '../../icongmail.png';

import "./Footer.styled.css";
import { Grid, Typography } from "@material-ui/core";

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


  const links = [
    { title: 'FAQ', url: '/' },
    { title: 'Pangkalan', url: '/pangkalan' },
    { title: 'Syarat Pangkalan', url: '/SyaratPangkalan' },
    { title: 'Tentang Kami', url: '/tentang-kami' },
    { title: 'FAQ', url: '/' },
  ]

  return (
    <Grid container className="kop-footer">
      <Grid item xs={4} className="section left" >
        <div className="title">
          <Typography variant="h6">Tentang Kami:</Typography>
        </div>
        <ul className="info-left">
          {links.map((link, i) => {
            return <li className="info-item" key={'links-' + i}>
              <Link to={link.url}>{link.title}</Link>
            </li>
          })}
        </ul>
      </Grid>
      <Grid item xs={4} className="section mid" >
        <div className="title">
          <Typography variant="h6">Koperasi Pensiunan Pertamina</Typography>
        </div>
        <div className="body">
          <p>
            Jl. Parakan Saat No. 57 Kelurahan
            <br />
            Antapani Tengah Kecamatan
            <br />
            Antapani - Kota Bandung 40291
          </p>
        </div>
      </Grid>
      <Grid item xs={4} className="section right" >
        <div className="title">
          <Typography variant="h6">Hubungi Kami:</Typography>
        </div>
        <div className="body">
          <a className="link-icon" href=' https://wa.me/62811245238'>
            <img src={iconWa} alt="iconWhatsapp" className='icon' width={20} />
          </a>
          <a className="link-icon" href='mailto:kopanabandung@gmail.com'>
            <img src={iconGmail} alt="iconGmail" className='icon' width={20} />
          </a>
        </div>
      </Grid>
    </Grid>
  );
};

export default Footer;
