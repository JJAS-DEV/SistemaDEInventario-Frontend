import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2'
import { RouterOutlet, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { error } from 'console';
import { state } from '@angular/animations';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,RouterModule],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {
  users: User[] = [];

  paginator: any={};
  constructor(private service: UserService, private router: Router,
    private sharingData: SharingDataService, 
  private route:ActivatedRoute) {
     

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const page=+(params.get('page')|| '0');

      // 0this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[]);



    })

    // this.service.findAll().subscribe(users => this.users = users);

    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent()

  }
  pageUsersEvent(){
    this.sharingData.pageUsersEventEmitter.subscribe(pageable=>{
      this.users=pageable.users;
      this.paginator= pageable.paginator;
    })
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
            this.router.navigate(['/users/page/'+this.paginator.number]),{
            state:{  users: this.users,
              paginator: this.paginator
            }};
            
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
          this.router.navigate(['/users']),{
            state:{  users: this.users,
              paginator: this.paginator
            }};

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
              this.router.navigate(['/users']),{
                state:{  users: this.users,
                  paginator: this.paginator
                }};
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
