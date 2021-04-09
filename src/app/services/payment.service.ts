import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44378/api/payments/'
  
  constructor(private httpClient : HttpClient) { }

  getByCustomerId(customerId:number):Observable<listResponseModel<Payment>>{
    let newPath = this.apiUrl + "getbycustomerid?customerId="+customerId
    return this.httpClient.get<listResponseModel<Payment>>(newPath); 
  }

  add(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }
}
