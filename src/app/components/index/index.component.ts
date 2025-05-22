import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/Role';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  roles:Role[]=[];

  constructor(    private authService:AuthService,
  ){
    this.roles = this.authService.getRoles();

  }


}
