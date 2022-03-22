import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom';

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: right;
  margin-left: 900px;
  text-decoration: none;
  padding: 0 1rem;
  height: 65px;
  width: 65px;
  top:150px;
  position:absolute;

  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;