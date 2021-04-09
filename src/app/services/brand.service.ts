import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44378/api/brands/';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<listResponseModel<Brand>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<listResponseModel<Brand>>(newPath);
  }

  getByBrandId(brandId:number):Observable<listResponseModel<Brand>>{
    let newPath = this.apiUrl + 'getbybrandid?brandId='+ brandId;
    return this.httpClient.get<listResponseModel<Brand>>(newPath);
  }

  add(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  update(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  delete(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
}
