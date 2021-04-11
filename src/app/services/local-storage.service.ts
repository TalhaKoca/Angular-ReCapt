import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  token: string = 'token';
  currentUser: string = 'currentUser';
  constructor() {}

  setToken(tokenInput: TokenModel) {
    localStorage.setItem(this.token, JSON.stringify(tokenInput));
  }

  getToken(): TokenModel {
    return JSON.parse(localStorage.getItem(this.token));
  }

  removeToken() {
    localStorage.removeItem(this.token);
  }

  setCurrentUser(user: User) {
    localStorage.setItem(this.currentUser, JSON.stringify(user));
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.currentUser));
  }

  removeCurrentUser() {
    localStorage.removeItem(this.currentUser);
  }
}
