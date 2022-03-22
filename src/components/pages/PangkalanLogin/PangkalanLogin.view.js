import React from 'react';
import FooterLogin from '../../FooterLogin/FooterLogin.view';
import FormPeminjaman from '../../FormPeminjaman/FormPeminjaman.view';
import NavbarLogin from '../../NavbarLogin/NavbarLogin.view';

const PangkalanLogin = () => {


    return (
      <div>
        <NavbarLogin />
        <FormPeminjaman />
        <FooterLogin />
      </div>
    );
}

export default PangkalanLogin