import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users:User[]=[{

    id:1,
    name:'andres',
    lastname:'ayasd',
    email:'ander@dsa.com',
    username:'jjas',
    password:'21332'
  },{  
  id:1,
  name:'andres',
  lastname:'ayasd',
  email:'ander@dsa.com',
  username:'jjas',
  password:'21332'
  }


]


  constructor() { }

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
