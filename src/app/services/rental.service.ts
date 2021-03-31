import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44378/api/rentals/'

  constructor(private httpClient:HttpClient) {
    this.getRentalDetails();
   }

  getRentals():Observable<listResponseModel<Rental>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<listResponseModel<Rental>>(newPath)
  }

  getRentalDetails():Observable<listResponseModel<RentalDetail>>{
    let newPath = this.apiUrl + "rentaldetails"
    return this.httpClient.get<listResponseModel<RentalDetail>>(newPath)
  }
}
