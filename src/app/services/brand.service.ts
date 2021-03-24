import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { listResponseModel } from '../models/listResponseModel';
@Injectable({
  providedIn: 'root',
})
export class BrandService {

  apiUrl = 'https://localhost:44378/api/brands/getall';
  
  constructor(private httpClient: HttpClient) {}
  
  getBrands(): Observable<listResponseModel<Brand>> {
    return this.httpClient.get<listResponseModel<Brand>>(this.apiUrl);
  }
}
