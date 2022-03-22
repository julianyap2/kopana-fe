import React from "react";
import Navbar from '../../Navbar/Navbar.view';
import FooterLogin from "../../FooterLogin/FooterLogin.view";
import Setting from "../../Setting/Setting.view";
import NavbarLogin from "../../NavbarLogin/NavbarLogin.view";

const ProfileSetting = () => {
  return (
    <div>
      <NavbarLogin />
      <Setting/>
      <FooterLogin />
    </div>
  );
};

export default ProfileSetting;
