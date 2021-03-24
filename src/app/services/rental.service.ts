import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44378/api/rentals/getall'

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<listResponseModel<Rental>>{
    return this.httpClient.get<listResponseModel<Rental>>(this.apiUrl)
  }
}
