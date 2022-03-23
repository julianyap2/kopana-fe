/// <reference types="react-scripts" />

var Kopana: KopanaInstance;

type AxiosInstance = import("axios").AxiosInstance;
interface KopanaInstance extends AxiosInstance {
   readonly baseUrl: string;

   isStatus200ish(status: number): boolean;
   isStatus400ish(status: number): boolean;
   isStatus500ish(status: number): boolean;

   join(path: string): string;
}

interface QueryParams {
   [x: string]: string | number | boolean | (string | number | boolean)[];
}