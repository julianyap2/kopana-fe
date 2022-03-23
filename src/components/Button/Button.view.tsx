import React from "react";
import { Link, To } from "react-router-dom";
import { classNames } from "../../utils/merge-classname";

import "./Button.styled.css";

const STYLES = ["primary", "outline", "test"] as const;

const SIZES = ["medium", "large", "small"] as const;

export default function Button({
   children,
   type,
   onClick,
   theme = "primary",
   size = "small",
   link,

   ...props
}: ButtonProps) {
   const className = classNames("btn", {
      [`btn-${theme}`]: STYLES.includes(theme),
      [`btn-${size}`]: SIZES.includes(size),
   });

   const mainContent = (
      <button
         {...props}
         className={className}
         onClick={onClick}
         type={type}
      >
         {children}
      </button>
   );

   return link ? (
      <Link to={link} className="btn-mobile">
         {mainContent}
      </Link>
   ) : (
      mainContent
   );
}

type HtmlButtonProps = JSX.IntrinsicElements["button"];
export interface ButtonProps extends HtmlButtonProps {
   link?: To;
   size?: "large" | "medium" | "small";
   type?: "button" | "submit" | "reset";
   theme?: "outline" | "primary" | "test";
   children?: React.ReactNode;
   onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}
