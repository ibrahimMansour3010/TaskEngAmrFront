import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  Login(loginUser:object){
    return this.httpClient.post(environment.URL+'api/Auth/Login',loginUser);
  }
}
