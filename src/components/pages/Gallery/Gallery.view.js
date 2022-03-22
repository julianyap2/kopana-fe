import React from "react";
import Navbar from '../../Navbar/Navbar.view';
import Footer from "../../Footer/Footer.view";
import TitlebarGridList from "../../Grid/Grid.view";

const Gallery = () => {
  return (
    <div>
      <Navbar />
      <TitlebarGridList/>
      <Footer />
    </div>
  );
};

export default Gallery;
