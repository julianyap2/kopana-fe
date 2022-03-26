import React, { useEffect, useState } from "react";
import IconSetting from "@material-ui/icons/SettingsOutlined";
import IconFingerPrint from "@material-ui/icons/FingerprintOutlined";
import IconMail from "@material-ui/icons/Mail";
import image from "../../images/settings.png";
import profileImg from "../../images/blank.png";

import "./profile-header.scss";
import { Link } from "react-router-dom";
import { classNames } from "utils/merge-classname";

const ProfileHeader = () => {
   const [member, setMember] = useState({} as any);
   const [loading, setIsLoading] = useState(true);
   const getUser = async () => {
      try {
         let tes = JSON.parse(localStorage.getItem("user"));
         // console.log(tes.id);
         const response = await Kopana.get(`/member/${tes.id}`);
         console.log(response.data);
         setMember(response.data);
         setIsLoading(false);
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      getUser();
   }, []);

   let fotoProfile = member.foto || profileImg;
   if (fotoProfile !== profileImg) {
      fotoProfile = Kopana.join(fotoProfile);
   }

   if (loading) return null;
   return (
      <div className="profile-header">
         <div className="header-image">
            <img
               src={fotoProfile}
               alt="no-photo"
               style={{
                  width: 150,
                  height: 150,
                  marginLeft: "20px",
                  display: "inline-block",
                  verticalAlign: "middle",
               }}
            />
         </div>
         <div className="header-bio">
            <ul className="bio-list">
               <BioItem>
                  <h3>{uppercase(member.nama, true)}</h3>
               </BioItem>
               <BioItem icon={<IconMail fontSize="medium" />}>
                  {member.email}
               </BioItem>
               <BioItem icon={<IconFingerPrint fontSize="medium" />}>
                  {member.nomerPegawaiPertamina}
               </BioItem>
            </ul>
         </div>
         <div className="header-misc">
            <Link to="/profile-setting" title="Open Setting">
               {/* <img src={image} alt={"Logo"} width={50} /> */}
               <IconSetting className="setting-icon" fontSize="large" />
            </Link>
         </div>
      </div>
   );
};

export default ProfileHeader;

function uppercase(text: string, firstLetter = false) {
   if (!firstLetter) return text.toUpperCase();
   return text[0].toUpperCase() + text.slice(1);
}

function BioItem(props: BioItemProps) {
   const hasIcon = !!props.icon;

   const className = classNames({
      "with-icon": hasIcon,
   });

   return (
      <li className={className}>
         {!hasIcon ? (
            props.children
         ) : (
            <>
               <div className="icon-wrap">{props.icon}</div>
               <div className="icon-content">{props.children}</div>
            </>
         )}
      </li>
   );
}

interface BioItemProps {
   icon?: React.ReactNode;
   children?: React.ReactNode;
}
