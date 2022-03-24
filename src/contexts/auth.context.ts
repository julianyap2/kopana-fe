import axios from "axios";
import {
   createContext,
   createElement,
   PropsWithChildren,
   useCallback,
   useContext,
   useEffect,
   useState,
} from "react";

const AuthContext = createContext<IAuthContext>(null);
AuthContext.displayName = "AuthContext";

export function AuthProvider({
   children,
}: PropsWithChildren<{}>): JSX.Element {
   const [isLoggedIn, setLoggedIn] = useState(false);
   const [roles, setRoles] = useState<string[]>([]);

   useEffect(() => {
      Kopana.get("/whoami")
         .then((res) => {
            if (Kopana.isStatus200ish(res.status)) {
               setLoggedIn(true);
               setRoles(res.data.roles.map((e) => e.name));
            }
         })
         .catch((e) => setLoggedIn(false));
   }, []);

   return createElement(AuthContext.Provider, {
      value: {
         storage: "user",
         roles,
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
         const res = await Kopana.post<IAuthLoginResponse>("/login", {
            email,
            password,
         });

         console.log(res);
         if (Kopana.isStatus200ish(res.status)) {
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
      Kopana.get("/logout").then((res) => {
         
         localStorage.removeItem(c.storage);
         c.login(false);
      });
   }, [c.isLoggedIn]);

   return Object.freeze<IAuthHook>({
      get user() {
         const s = localStorage.getItem(c.storage);
         return s ? JSON.parse(s) : null;
      },
      isLogin: c.isLoggedIn,
      isAdmin() {
         return c.roles.includes("admin");
      },
      Login,
      Logout,
   });
}

export interface IAuthHook {
   user: IAuthUser;
   isLogin: boolean;
   isAdmin(): boolean;
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
   readonly roles: string[];
   login(v: boolean): void;
}

interface IAuthLoginResponse {
   data: IAuthUser;
   message: string;
}
