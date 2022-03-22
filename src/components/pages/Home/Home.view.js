import React from "react";
import {ImageSliderData} from '../../Slider/ImageSlider.data';
import ImageSlider from '../../Slider/ImageSlider.view';
import Navbar from '../../Navbar/Navbar.view';
import Footer from "../../Footer/Footer.view";
import Faq from "../../FAQ/Faq.list";

const Home = () => {
  return (
    <div>
      <Navbar />
      <ImageSlider  />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
