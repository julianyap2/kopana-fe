import { isStatus200ish, KopanaApi } from "api";
import axios from "axios";
import {
   createContext,
   createElement,
   PropsWithChildren,
   useCallback,
   useContext,
   useState,
} from "react";

const AuthContext = createContext<IAuthContext>(null);
AuthContext.displayName = "AuthContext";

export function AuthProvider({
   children,
}: PropsWithChildren<{}>): JSX.Element {
   const [isLoggedIn, setLoggedIn] = useState(
      !!localStorage.getItem("user")
   );

   return createElement(AuthContext.Provider, {
      value: {
         storage: "user",
         isLoggedIn,
         login: (v: boolean) => setLoggedIn(v),
      },
      children,
   });
}

export function useAuth(): IAuthHook {
   const c = useContext(AuthContext);

   const Login = useCallback(
      async (email: string, password: string) => {
         const res = await KopanaApi.post<IAuthLoginResponse>("/login", {
            email,
            password,
         });

         if (isStatus200ish(res.status)) {
            localStorage.setItem(c.storage, JSON.stringify(res.data.data));
         }

         c.login(true);
         return {
            status: res.status,
            user: res.data.data,
         };
      },
      [c.isLoggedIn]
   );
   const Logout = useCallback(async () => {
      const user = localStorage.getItem(c.storage);
      if (!user) return;

      localStorage.removeItem(c.storage);
      c.login(false);
   }, [c.isLoggedIn]);

   return Object.freeze<IAuthHook>({
      get user() {
         const s = localStorage.getItem(c.storage);
         return s ? JSON.parse(s) : null;
      },
      isLogin: c.isLoggedIn,
      Login,
      Logout,
   });
}

export interface IAuthHook {
   user: IAuthUser;
   isLogin: boolean;
   Login(
      email: string,
      password: string
   ): Promise<{ status: number; user: IAuthUser }>;
   Logout(): Promise<void>;
}

export interface IAuthUser {
   id: string;
   idUser: string;

   email: string;
   nama: string;

   noPegawaiPertamina: string;
   noTlpn?: string;
}

interface IAuthContext {
   readonly storage: string;
   readonly isLoggedIn: boolean;
   login(v: boolean): void;
}

interface IAuthLoginResponse {
   data: IAuthUser;
   message: string;
}