import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root',
})
export class RentalService {
  rentedCar: Rental;
  apiUrl = 'https://localhost:44378/api/rentals/';

  constructor(private httpClient: HttpClient) {
    this.getRentalDetails();
  }

  add(rental: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getRentals(): Observable<listResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<listResponseModel<Rental>>(newPath);
  }

  getRentalByCarId(carId: number): Observable<listResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getbycarid?carId=' + carId;
    return this.httpClient.get<listResponseModel<Rental>>(newPath);
  }

  getRentalDetails(): Observable<listResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentaldetails';
    return this.httpClient.get<listResponseModel<RentalDetail>>(newPath);
  }

  setRentedCar(rental: Rental) {
    this.rentedCar = rental;
  }

  getRentedCar(){
    return this.rentedCar;
  }
  removeRentedCar() {
    this.rentedCar = null;
  }
}
