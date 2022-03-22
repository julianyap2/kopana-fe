import React from "react";
import {ImageSliderData} from '../../Slider/ImageSlider.data';
import ImageSlider from '../../Slider/ImageSlider.view';
import FooterLogin from "../../FooterLogin/FooterLogin.view";
import Faq from "../../FAQ/Faq.list";
import NavbarLogin from "../../NavbarLogin/NavbarLogin.view";

const HomeLogin = () => {
  return (
    <div>
      <NavbarLogin />
      <ImageSlider />
      <Faq />
      <FooterLogin />
    </div>
  );
};

export default HomeLogin;
