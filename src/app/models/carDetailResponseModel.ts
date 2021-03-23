import { CarDetails } from "./carDetail";
import { ResponseModel } from "./responseModel";

export interface CarDetailResponseModel extends ResponseModel{
    data:CarDetails[]
}