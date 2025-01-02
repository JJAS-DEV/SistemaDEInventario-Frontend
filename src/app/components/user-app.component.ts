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

  }

  addUser():void {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.users = this.users.map(u => (u.id == user.id) ? { ...user } : u)
      } else {

        this.users = [... this.users, { ...user, id:new Date().getTime() }];
      }
      this.router.navigate(['/users'], { state: { users: this.users } });

      Swal.fire({
        title: "guardado",
        text: "Usuario guardado con exito",
        icon: "success"
      });

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
          this.users = this.users.filter(user => user.id != id);
          this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users'], { state: { users: this.users } });
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
