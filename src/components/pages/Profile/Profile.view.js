import React,{useEffect} from "react";
import FooterLogin from "../../FooterLogin/FooterLogin.view";
import TabGroup from "../../Tabs/Tabs.view";
import ProfileHeader from "../../ProfileHeader/ProfileHeader.view";
import NavbarLogin from "../../NavbarLogin/NavbarLogin.view";
import axios from "axios";

const Profile = () => {

  

  return (
    <div>
      <NavbarLogin/>
      <ProfileHeader/>
      <TabGroup/>
      <FooterLogin />
    </div>
  );
};

export default Profile;
