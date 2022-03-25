import axios, { AxiosInstance } from "axios";

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;
const SERVER_API = SERVER_URL + '/api/v1';
export const KopanaApi = axios.create({
   baseURL: SERVER_API,
   withCredentials: true,
}) as KopanaInstance;

export function isStatus200ish(status: number) {
   return status >= 200 && status < 300;
}

export function isStatus400ish(status: number) {
   return status >= 400 && status < 500;
}

export function isStatus500ish(status: number) {
   return status >= 500 && status < 600;
}

declare global {
   interface Window {
      KopanaApi: AxiosInstance;
   }
}

export function initGlobal() {
   ((kopana) => {
      //@ts-ignore
      kopana.baseUrl = SERVER_URL;

      kopana.isStatus200ish = isStatus200ish;
      kopana.isStatus400ish = isStatus400ish;
      kopana.isStatus500ish = isStatus500ish;

      kopana.join = function (path: string) {
         if (!path.startsWith("/")) path = "/" + path;
         
         return SERVER_URL + path;
      };
   })((window.Kopana = KopanaApi));
}
