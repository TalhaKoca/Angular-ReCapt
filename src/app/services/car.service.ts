import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetails } from '../models/carDetail';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44378/api/';

  constructor(private httpClient: HttpClient) {}

  add(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  delete(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/delete';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  getCars(): Observable<listResponseModel<CarDetails>> {
    let newPath = this.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }

  getCarById(carId:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getcarbyid?carId=' + carId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<listResponseModel<CarDetails>> {
    let newPath =
      this.apiUrl + 'cars/getcardetailsbybrandid?brandId=' + brandId;
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<listResponseModel<CarDetails>> {
    let newPath =
      this.apiUrl + 'cars/getcardetailsbycolorid?colorId=' + colorId;
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }

  getCarDetailsByCarId(
    carId: number
  ): Observable<listResponseModel<CarDetails>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbycarid?carId=' + carId;
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }

  getCarDetailsByBrandAndColorId(
    colorId: number,
    brandId: number
  ): Observable<listResponseModel<CarDetails>> {
    let newPath =
      this.apiUrl +
      'cars/getcardetailsbybrandidcolorid?colorId=' +
      colorId +
      '&brandId=' +
      brandId;
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }
}
