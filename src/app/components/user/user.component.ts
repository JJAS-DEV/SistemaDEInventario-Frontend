import { Component, Input, Output,EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
})

export class UserComponent {

  @Input() users:User[]=[];


  @Output() idUserEventEmitter = new EventEmitter();
  @Output() selectdUserEvenEmitter = new EventEmitter();




  onRemoveUser(id:number):void {
    this.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user:User):void{
    this.selectdUserEvenEmitter.emit(user);
  }




}


