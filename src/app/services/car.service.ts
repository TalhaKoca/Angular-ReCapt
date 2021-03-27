import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetails } from '../models/carDetail';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44378/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<listResponseModel<CarDetails>> {
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }

  getCarsByBrand(brandId:number): Observable<listResponseModel<CarDetails>> {
    let newPath = this.apiUrl + "cars/getcardetailsbybrandid?brandId="+ brandId
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<listResponseModel<CarDetails>>{
    let newPath=this.apiUrl + "cars/getcardetailsbycolorid?colorId="+colorId
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<listResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycarid?carId=" + carId;
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }
}