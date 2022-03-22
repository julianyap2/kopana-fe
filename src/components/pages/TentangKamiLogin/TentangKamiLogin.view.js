import React from 'react';
import './TentangKamiLogin.styled.css';
import Navbar from '../../Navbar/Navbar.view';
import FooterLogin from '../../FooterLogin/FooterLogin.view';
import AboutUs from '../../AboutUs/AboutUs.view';
import NavbarLogin from '../../NavbarLogin/NavbarLogin.view';

const TentangKami = () => {
    
    return(
        <div>
            <NavbarLogin />
            <AboutUs />
            <FooterLogin />
        </div>
    )

}

export default TentangKami
