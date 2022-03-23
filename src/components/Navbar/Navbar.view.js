import React, { useState, useMemo } from 'react';
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
import { useAuth } from 'contexts/auth.context';



const Navbar = () => {
  const auth = useAuth();

  const links = [
    { title: 'Galeri', url: '/gallery' },
    { title: 'Pangkalan', url: '/pangkalan' },
  ]

  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={image} alt={'Logo'} style={{ height: "70px" }} />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>
            Beranda
          </NavLink>

          {links.map(({ title, url }) => {
            url += auth.isLogin ? '-login' : '';
            return <NavLink to={url} activeStyle>
              {title}
            </NavLink>
          })}

        </NavMenu>
        <NavBtn>
          {auth.isLogin ?
            <NavBtnLink to='/profile'>Profile</NavBtnLink> :
            <NavBtnLink to='/login'>Log In</NavBtnLink>
          }
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
