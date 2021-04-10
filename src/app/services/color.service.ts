import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44378/api/colors/';

  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<listResponseModel<Color>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<listResponseModel<Color>>(newPath);
  }

  getByColorId(colorId:number):Observable<listResponseModel<Color>>{
    let newPath = this.apiUrl + 'getcolorbyid?colorId='+ colorId;
    return this.httpClient.get<listResponseModel<Color>>(newPath);
  }

  add(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  update(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  delete(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }
}
