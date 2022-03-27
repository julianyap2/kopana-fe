import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
   Box,
   Button,
   IconButton,
   Modal,
   Tooltip,
} from "@material-ui/core";
import IconAddPhoto from "@material-ui/icons/AddPhotoAlternate";
import Navbar from "../../Navbar/Navbar.view";
import Footer from "../../Footer/Footer.view";
import TitlebarGridList from "../../Grid/Grid.view";

import "./Gallery.scss";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "contexts/auth.context";

const Gallery = () => {
   const auth = useAuth();
   return (
      <div>
         <Navbar />
         {auth.isLogin && auth.isAdmin && <NavGallery />}
         <TitlebarGridList />
         <Footer />
      </div>
   );
};

export default Gallery;

function NavGallery() {
   const toast = useToasts();

   const onFileUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const form = new FormData();
      for (const file of e.target.files) form.append("galery", file);
      Kopana.post("/galeri", form)
         .then((res) => {
            console.log(res);
            if (Kopana.isStatus200ish(res.status)) {
               toast.addToast("Berhasil Upload!", {
                  appearance: "success",
               });
            }
         })
         .catch(console.error);
   };

   return (
      <Box
         className="toolbar-gallery"
         sx={{
            display: "flex",
            textAlign: "center",
            padding: "4px 20px",
         }}
         style={{ backgroundColor: "#50a6fc" }}
      >
         <Tooltip title="Add Image">
            <label className="toolbar-wrap" htmlFor="icon-button-file">
               <input
                  className="btn-item"
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  multiple
                  onChange={onFileUploadChange}
               />
               <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
               >
                  <IconAddPhoto />
               </IconButton>
            </label>
         </Tooltip>
      </Box>
   );
}

interface NavGalleryItemProps {
   title: string;
   icon?: React.ReactElement;
   children?: React.ReactNode;
}
