import React from "react";
import Navbar from '../../Navbar/Navbar.view';
import Footer from "../../Footer/Footer.view";
import FormPeminjaman from "../../FormPeminjaman/FormPeminjaman.view";

const Peminjaman = () => {
  return (
    <div>
      <Navbar />
      <FormPeminjaman/>
      <Footer />
    </div>
  );
};

export default Peminjaman;
