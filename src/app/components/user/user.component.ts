import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
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

export class UserComponent implements OnInit{

 title: string = 'Listado de usuarios!';
 
   users: User[] = [];
  
   constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router) { }
  ngOnInit(): void {
    console.log('consulta findAll')
    this.service.findAll().subscribe(users => this.users = users);


  }







  onRemoveUser(id:number):void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user:User):void{
   //   this.sharingData.selectdUserEvenEmitter.emit(user);
    this.router.navigate(['/users/edit',user.id]);
  }




}


