import { Car } from "./car";

export interface CarDetails extends Car{
    brandName:string;
    colorName:string;
    images:string[]
}