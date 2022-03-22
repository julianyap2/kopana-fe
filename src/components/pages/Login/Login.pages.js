import React from "react";
import Navbar from '../../Navbar/Navbar.view';
import Footer from "../../Footer/Footer.view";
import Login from "../../Login/Login.view";

const loginPages = () => {
  return (
    <div>
      <Navbar />
      <Login/>
      <Footer />
    </div>
  );
};

export default loginPages;