import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2'
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { error } from 'console';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,RouterModule],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {
  open: boolean = false;
  users: User[] = [];
  constructor(private service: UserService, private router: Router,
    private sharingData: SharingDataService) {
     

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);

    this.addUser();
    this.removeUser();
    this.findUserById();

  }

  findUserById(){

    this.sharingData.findUserByIdEventEmitter.subscribe(id=>
    {
      const user =this.users.find(user=> user.id== id);
      this.sharingData.selectUserEventEmitter.emit(user);
    }
    )


  }

  addUser():void {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      console.log("lo que llega"+ user)

      if (user.id > 0) {
        this.service.update(user).subscribe({
          next: (userUpdated) => {
            // Actualizar la lista de usuarios
            this.users = this.users.map(u => (u.id === userUpdated.id) ? { ...userUpdated } : u);
      
            // Redirigir al listado de usuarios
            this.router.navigate(['/users']);
            
      Swal.fire({
        title: "actualizado",
        text: "Usuario"+userUpdated.name+" editado con exito ",
        icon: "success"
      });
          },
          error: (err) => {
            // Manejo de errores
            // console.error(err.error);
            if(err.status==400){
              this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);

            }
          }
        });
      }
         else {
        this.service.create(user).subscribe({
          
          next:(userNew) =>{

          
          console.log(userNew)

          this.users = [... this.users, { ...userNew}];
          Swal.fire({
            title: "guardado",
            text: "Usuario"+userNew.name+" guardado con exito ",
            icon: "success"
          });
          this.router.navigate(['/users']);

        },
        error:(err)=>{

          // console.log(err.error)
          if(err.status==400){
            this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);

          }
        }



        })

      }


    })

  }

  removeUser():void {
    this.sharingData.idUserEventEmitter.subscribe(id => {

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
          this.service.remove(id).subscribe(()=>{
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users']);
            });
  
          });


          Swal.fire({
            title: "eliminado!",
            text: "usuario eliminado con exito",
            icon: "success"
          });
        }
      });

    })


  }
 

}
