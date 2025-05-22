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
import { AuthService } from '../services/auth.service';
import { response } from 'express';
import { Store } from '@ngrx/store';
import { add, find, findAll, remove, setPaginator, update } from '../store/users.actions';

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
  user!:User; 


  constructor(private service: UserService,
    private store:Store<{users:any}>
    ,private router: Router,
  private sharingData: SharingDataService,
  private authService:AuthService,

  private route:ActivatedRoute) {

    this.store.select('users').subscribe(state=>{
      this.users=state.users;
      this.paginator=state.paginator;
      this.user={... state.user};

    })

     

  }
  ngOnInit(): void {
   


    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
    

  }
  handlerLogin(){
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password})=>{
      console.log(username+"  "+ password);

      this.authService.loginUser({username,password}).subscribe({
        next: response=>{
          const token= response.token;
          console.log(token)
          const payload= this.authService.getPayload(token);
          const user ={username:payload.sub}

          const login={
            user,
            isAuth:true,
            isAdmin:payload.isAdmin
            
          }
          console.log(payload);
          this.authService.token= token;
          this.authService.user=login;
          this.router.navigate(['index'])
         

        },
        error:error=> {
          if(error.status==401){
            console.log(error.error);
            console.log("entro aqui en 401")
            Swal.fire(
                    error.error.error,
                    error.error.messages,
                    'error'
                  );



          }

          if(error.status === 0){

            Swal.fire(
              "sin conexión al servidor",
              "sin conexión",
              'error'
            );

          }
          

        }


      })



    }
    
    )

  }
  pageUsersEvent(){
    this.sharingData.pageUsersEventEmitter.subscribe(pageable=>{
      // this.users=pageable.users;
      // this.paginator= pageable.paginator;
      this.store.dispatch(findAll({users:pageable.users}))
      this.store.dispatch(setPaginator({paginator:pageable.paginator}))
    })
  }

  findUserById(){

    this.sharingData.findUserByIdEventEmitter.subscribe(id=>
    {
      // const user =this.user8s.find(user=> user.id== id);
      this.store.dispatch(find({id})) 
      this.sharingData.selectUserEventEmitter.emit(this.user);
    }
    )


  }

  addUser():void {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      console.log("lo que llega"+ user)

      if (user.id > 0) {
        this.service.update(user).subscribe({
          next: (userUpdate) => {
            // Actualizar la lista de usuarios
            // this.users = this.users.map(u => (u.id === userUpdated.id) ? { ...userUpdated } : u);
            
            // Redirigir al listado de usuarios
            this.store.dispatch(update({userUpdate})) 
            this.router.navigate(['/users/page/'+this.paginator.number]),{
            state:{  users: this.users,
              paginator: this.paginator
            }};
            
      Swal.fire({
        title: "actualizado",
        text: "Usuario "+userUpdate.name+" editado con exito ",
        icon: "success"
      });
          },
          error: (err) => {
            // Manejo de errores
            // console.error(err.error);
       
              if(err.status==400){
                this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);
                Swal.fire(
                  'Error en el registro',
                   err.error.message,
                  'error'
                );
    
              

            }else{
              this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);
              Swal.fire(
                'Error en actualizar el usuario',
                 err.error.message,
                'error'
              );

            }
          }
        });
      }
         else {
        this.service.create(user).subscribe({
           
          next:(userNew) =>{

          
          console.log(userNew)

          // this.users = [... this.users, { ...userNew}];
          this.store.dispatch(add({userNew}));
          Swal.fire({
            title: "guardado",
            text: "Usuario "+userNew.name+" guardado con exito ",
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
            Swal.fire(
              'Error en el registro',
               err.error.message,
              'error'
            );

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
            // this.users = this.users.filter(user => user.id != id);
            this.store.dispatch(remove({id}));
            
  
          });


          Swal.fire({
            title: "eliminado!",
            text: "usuario eliminado con exito",
            icon: "success"
          });
          this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users/']),{
              state:{  users: this.users,
                paginator: this.paginator
              }};
          });
        }
      });

    })


  }
 

}
