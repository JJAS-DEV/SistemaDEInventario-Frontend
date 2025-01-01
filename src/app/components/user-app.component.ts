import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent,UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrl:  './user-app.component.css'
})
export class UserAppComponent implements OnInit { 
  open:boolean=false;
  title:string ="listado Usuarios";
  users:User []=[];
  userSelected:User;
  constructor(private service:UserService){
    this.userSelected=new User();

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users=> this.users=users)
  }

  addUser(user:User){
    if(user.id>0){
      this.users=this.users.map(u=> (u.id==user.id)? {...user}:u)
    }else{

    this.users=[... this.users,{... user}];
    }
  
    Swal.fire({
      title: "guardado",
      text: "Usuario guardado con exito",
      icon: "success"
    });
    this.userSelected= new User();
    this.setOpen();  
  }

  removeUser(id:number){
    Swal.fire({
      title: "estas seguro que quieres eliminar?",
      text: "el dato del usui sera eliminado del sistema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users=this.users.filter(user => user.id !=id);

        Swal.fire({
          title: "eliminado!",
          text: "usuario eliminado con exito",
          icon: "success"
        });
      }
    });
    
  }
  setSelectedUser(userRow:User):void{
    this.userSelected={... userRow};

    this.open=true;


  }


  setOpen(){
    this.open= !this.open;
  }

}
