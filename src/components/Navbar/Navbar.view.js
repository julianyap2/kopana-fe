import React,{useState,useMemo} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Logo
} from './Navbar.styled';
import image from '../../images/logo.svg'
import Dropdown from 'react-bootstrap/Dropdown';



const Navbar = () => {
  
  return (
    <>
      <Nav>
        <NavLink to='/'>
            <img src={image} alt={'Logo'} style={{height:"70px"}}/>
        </NavLink>
        <Bars/>    
        <NavMenu>
          <NavLink to='/beranda' activeStyle>
            Beranda
          </NavLink>
          <NavLink to='/gallery' activeStyle>
            Galeri
          </NavLink>
          <NavLink to='/pangkalan' activeStyle>
            Pangkalan
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
