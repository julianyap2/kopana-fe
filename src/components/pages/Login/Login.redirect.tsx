import { useAuth } from "contexts/auth.context";
import { createElement, Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function IsLoginWrap({ children, ...props }: IsLoginWrapProps) {
   const auth = useAuth();
   const loc = useLocation();

   console.log(loc);
   if (auth.isLogin) return createElement(Fragment, { children });
   return (
      <Navigate
         to={{
            pathname: "/login",
         }}
         replace
         state={{
            lastVisit: loc,
         }}
      />
   );
}

export interface IsLoginWrapProps extends Record<string, any> {
   children: React.ReactNode;
}
