import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { User } from '../../models/user';


import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../models/Role';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  user: User;
  errors:any={};

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
  
  private service:UserService) { 
    this.user = new User();



  }
  ngOnInit(): void {
    // this.sharingData.selectUserEventEmitter.subscribe(user=> this.user=user);
    this.sharingData.errorsUSerFormEvenEmitter.subscribe(errors=> this.errors= errors);
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        // this.sharingData.findUserByIdEventEmitter.emit(id);
        this.service.findById(id).subscribe(user =>{
           this.user=user
           this.selectedRoles=user.roles
          
          });
      }
      


    }
    )


  }

availableRoles: Role[] = [
    { id: 1, name: 'ROLE_ADMIN' },
    { id: 3, name: 'ROLE_VENDEDOR' },
    { id: 4, name: 'ROLE_BODEGUERO' },
  ];

    selectedRoles: Role[]=[]; // Lista para almacenar los roles seleccionados


 onRoleChange(role: Role, event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;

  if (isChecked) {
    this.selectedRoles.push(role);
  } else {
    this.selectedRoles = this.selectedRoles.filter(r => r.id !== role.id);
  }
}
 isSelected(role: Role): boolean {
    return this.selectedRoles.some(selectedRole => selectedRole.id === role.id);
  }
  onSubmit(userForm: NgForm): void {
    this.user.roles=[];
    this.user.roles=this.selectedRoles;
    
    
    // if (userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    // }

    // userForm.reset();
    // userForm.resetForm();

  }

  onClear(userForm: NgForm): void {
    userForm.reset();

  }





}
