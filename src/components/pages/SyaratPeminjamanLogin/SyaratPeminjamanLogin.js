import React from "react";
import NavbarLogin from '../../NavbarLogin/NavbarLogin.view';
import FooterLogin from "../../FooterLogin/FooterLogin.view";
import SyaratPangkalanLogin from "../../SyaratPangkalanLogin/SyaratPangkalanLogin.view";

const SyaratPeminjamanLogin = () => {
  return (
    <div>
      <NavbarLogin/>
      <SyaratPangkalanLogin />
      <FooterLogin />
    </div>
  );
};

export default SyaratPeminjamanLogin;
