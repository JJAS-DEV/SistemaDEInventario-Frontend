import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {

  user: User;
  authenticated:any;

  constructor ( private  shariongData: SharingDataService , private authService:AuthService,private router:Router){
    this.user= new User();
    if(this.authService.user.isAuth){
      this.router.navigate(['/index'])       
    }
  }
 

  onSumit(){
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error de validacion',
        'Username y password requeridos',
        'error'
      );
    }else{

      this.shariongData.handlerLoginEventEmitter.emit({username: this.user.username,

        password:this.user.password
      });
    }
  }

}
