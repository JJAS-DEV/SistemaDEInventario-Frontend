import { Component, Input, Output,EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
})

export class UserComponent {

 title: string = 'Listado de usuarios!';
 
   users: User[] = [];
  
   constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe(users => this.users = users);
    }
  }







  onRemoveUser(id:number):void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user:User):void{
   //   this.sharingData.selectdUserEvenEmitter.emit(user);
    this.router.navigate(['/users/edit',user.id], {state:{user}});
  }




}


