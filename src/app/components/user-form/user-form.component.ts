import { Component, Output ,EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms'
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {

  user: User;

  @Output() newUserEventEmitter: EventEmitter<User>= new EventEmitter();
  
constructor(){
  this.user=new User();
}

onSubmit():void{
  this.newUserEventEmitter.emit(this.user);
  console.log(this.user);
}








}
