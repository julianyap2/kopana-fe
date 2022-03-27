import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { KopanaApi } from "api";
import { classNames } from "../../utils/merge-classname";
import { Box, Modal, Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme, GalleryGridStyleProps>((theme) => {
   return {
      root: {
         justifyContent: "space-around",
         overflow: "hidden",
         backgroundColor: theme.palette.background.paper,
         marginTop: 20,
         marginBottom: 20,
         padding: "0 40px",
      },
      "grid-list": {
      },
      "grid-wrap": {
         width: 300
      },
      "grid-content": (props) => ({
         cursor: "pointer",
         backgroundImage: `url(${props.imageUrl})`,
         width: "100%",
         height: "100%",
      }),
      titleBar: {
         background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      },
      icon: {
         color: "rgba(255, 255, 255, 0.54)",
      },

      "modal-thumb": {
         width: 'fit-content',
         position: "absolute",
         top: "50%",
         left: "50%",
         transform: "translate(-50%, -50%)",
         // width: 400,
         // border: "2px solid #000",
      },
   };
});

const TitlebarGridList = () => {
   const [foto, setFoto] = useState([]);
   const classes = useStyles({});

   async function getData() {
      try {
         const response = await KopanaApi.get("/galeri");
         console.log(response);
         setFoto(response.data.data);
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      getData();
   }, []);

   return (
      <div className={classes.root}>
         <GridList
            cellHeight={300}
            spacing={20}
            className={classes["grid-list"]}
         >
            {foto.length > 0 &&
               foto.map((tile) => (
                  <GridListTile key={tile.img} className={classes['grid-wrap']} >
                     <Thumbnail tile={tile} iconClassName={classes.icon} />
                  </GridListTile>
               ))}
         </GridList>
      </div>
   );
};

export default TitlebarGridList;

function LabelInfo(tile: DataImage) {
   return classNames("info about", {
      [tile.title || ""]: !!tile.title,
   });
}

function Thumbnail(props: ThumbnailProps) {
   const { tile, iconClassName } = props;
   const styles = useStyles({
      imageUrl: Kopana.join(tile.imageUrl),
   });
   const [open, setOpen] = useState(false);

   const toggleOpen = () => setOpen(!open);
   return (
      <>
         <div className={styles["grid-content"]} onClick={toggleOpen}>
            {/* <img src={Kopana.join(tile.imageUrl)} alt={tile.title} /> */}
            <GridListTileBar
               title={tile.title}
               actionIcon={
                  <IconButton
                     aria-label={LabelInfo(tile)}
                     className={iconClassName}
                  >
                     <InfoIcon />
                  </IconButton>
               }
            />
         </div>
         <Modal open={open} onClose={toggleOpen}>
            <Box className={styles['modal-thumb']}>
               <img width={900} src={Kopana.join(tile.imageUrl)} alt={tile.title} />
            </Box>
         </Modal>
      </>
   );
}

interface ThumbnailProps {
   tile: DataImage;
   iconClassName?: string;
}

interface DataImage {
   title: string;
   img: string;
   imageUrl: string;
}

interface GalleryGridStyleProps {
   imageUrl?: string;
}
interface GalleryGridStyle {}
