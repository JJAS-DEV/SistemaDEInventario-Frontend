import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule,PaginatorComponent],
  templateUrl: './user.component.html',
})

export class UserComponent implements OnInit{

 title: string = 'Listado de usuarios!';
 
   users: User[] = [];
   paginator:any={};

  
   constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router,
    private route : ActivatedRoute,
    private authService:AuthService
  
  ) {

      if (this.router.getCurrentNavigation()?.extras.state){
        this.users =this.router.getCurrentNavigation()?.extras.state!['users'];
        this.users =this.router.getCurrentNavigation()?.extras.state!['paginator'];
      }
     }
  ngOnInit(): void { 
    if(this.users == undefined || this.ngOnInit.length == 0 || this.users == null){

      console.log('consulta findAll')
      // this.service.findAll().subscribe(users => this.users = users);
      this.route.paramMap.subscribe(params=>{
        const page=+(params.get('page')|| '0');
        
        this.service.findAllPageable(page).subscribe(pageable => {
          
          this.users = pageable.content as User[];
          this.paginator=pageable;
          
          this.sharingData.pageUsersEventEmitter.emit({users: this.users,paginator:this.paginator});

  
  
      })
  

    })
  


  }
}







  onRemoveUser(id:number):void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user:User):void{
   //   this.sharingData.selectdUserEvenEmitter.emit(user);
    this.router.navigate(['/users/edit',user.id]);
  }
  get admin(){
    return this.authService.isAdmin();
  }



}


