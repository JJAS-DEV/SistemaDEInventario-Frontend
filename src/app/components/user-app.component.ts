import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent,UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit { 

  title:string ="listado Usuarios";

  users:User []=[];
  constructor(private service:UserService){

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users=> this.users=users)
  }

  addUser(user:User){

    this.users=[... this.users,{... user}];
  
  }


}
