import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api_url = 'https://localhost:44378/api/users/';
  constructor(private httpClient: HttpClient) {}

  getUsers():Observable<listResponseModel<User>>{
    return this.httpClient.get<listResponseModel<User>>(this.api_url);
  }
  
  getUserByEmail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = this.api_url + 'getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user: User): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.api_url, user);
  }
}
