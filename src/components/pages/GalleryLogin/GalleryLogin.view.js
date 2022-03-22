import React from "react";
import FooterLogin from "../../FooterLogin/FooterLogin.view";
import NavbarLogin from "../../NavbarLogin/NavbarLogin.view";
import TitlebarGridList from "../../Grid/Grid.view";

const GalleryLogin = () => {
  return (
    <div>
      <NavbarLogin />
      <TitlebarGridList/>      
      <FooterLogin />
    </div>
  );
};

export default GalleryLogin;
