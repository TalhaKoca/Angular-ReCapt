import { Customer } from "./customer";

export interface User extends Customer{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    findexpoint:number;
}