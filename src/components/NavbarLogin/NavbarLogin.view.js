import React,{useState,useMemo} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Logo
} from './NavbarLogin.styled';
import image from '../../images/logo.svg'
import Dropdown from 'react-bootstrap/Dropdown';



const NavbarLogin = () => {
  
  return (
    <>
      <Nav>
        <NavLink to='/'>
            <img src={image} alt={'Logo'} style={{height:"70px"}}/>
        </NavLink>
        <Bars/>    
        <NavMenu>
          <NavLink to='/beranda-login' activeStyle>
            Beranda
          </NavLink>
          <NavLink to='/gallery-login' activeStyle>
            Galeri
          </NavLink>
          <NavLink to='/pangkalan-login' activeStyle>
            Pangkalan
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/profile'>Profile</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavbarLogin;
