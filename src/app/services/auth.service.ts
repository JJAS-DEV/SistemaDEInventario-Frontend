import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  
  private url: string = 'http://localhost:8080/login';

  private _token: string | undefined;

  private _user: any = {
    isAuth: false,
    roles: [],
    user: undefined
  }

  constructor(private http: HttpClient) { }

  loginUser({ username, password }: any): Observable<any>{
    return this.http.post<any>(this.url, { username, password })
  }

  set user(user: any) {
    this._user = user;
    sessionStorage.setItem('login', JSON.stringify(user));
  }

  get user() {
    if (this._user.isAuth) {
      return this._user;
    } else if( typeof window !== 'undefined' && sessionStorage.getItem('login') != null) {
      this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
      return this._user;
    }
    return this._user;
  }

  set token(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);
    const decodedToken = this.getPayload(token);
    this._user.roles = decodedToken ? decodedToken.roles.map((roles: any) => roles.authority) : [];
    console.log("esto son los roles "+this._user.roles); 

  }

  get token() {
    if (this._token != undefined) {
      return this._token;
    } else if ( typeof window !== 'undefined' && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token || "";
  }

  getPayload(token: string) {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  authenticated() {
    return this.user.isAuth;
  }
  isauthenticated(){
    return
  }
  
  getRoles(): any[] {
    return this._user.roles;  // Devuelve el array de roles
  }

  logout() {
    this._token = undefined;
    this._user = {
      isAuth: false,
      roles: [],
      user: undefined
    };
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }

  getUsername(): string  {
    const token = this.token;
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.sub  || ""; 

    }
    return "";
  }
}


