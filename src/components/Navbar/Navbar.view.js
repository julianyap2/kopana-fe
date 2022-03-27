import {
   Nav,
   NavLink,
   Bars,
   NavMenu,
   NavBtn,
   NavBtnLink,
} from "./Navbar.styled";
import image from "../../images/logo.svg";
import { useAuth } from "contexts/auth.context";

const Navbar = () => {
   const auth = useAuth();

   const links = [
      { title: "Galeri", url: "/gallery" },
      { title: "Pangkalan", url: "/pangkalan" },
   ];

   return (
      <>
         <Nav>
            <NavLink to="/">
               <img src={image} alt={"Logo"} style={{ height: "70px" }} />
            </NavLink>
            <Bars />
            <NavMenu>
               <NavLink to="/" activeStyle>
                  Beranda
               </NavLink>

               {links.map(({ title, url, noLogin }) => {
                  if(auth.isAdmin && title === 'Pangkalan') return null;

                  if (!noLogin) url += auth.isLogin ? "-login" : "";
                  return (
                     <NavLink to={url} activeStyle>
                        {title}
                     </NavLink>
                  );
               })}

               {auth.isAdmin && (
                  <>
                     <NavLink to="/setoran" activeStyle>
                        List Setoran
                     </NavLink>
                     <NavLink to="/setoran/add" activeStyle>
                        Setoran
                     </NavLink>
                  </>
               )}
            </NavMenu>
            <NavBtn>
               {auth.isLogin ? (
                  <NavBtnLink to="/profile">Profile</NavBtnLink>
               ) : (
                  <NavBtnLink to="/login">Log In</NavBtnLink>
               )}
            </NavBtn>
         </Nav>
      </>
   );
};

export default Navbar;
