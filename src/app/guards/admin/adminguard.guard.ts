import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { Role } from '../../models/Role';

export const adminguardGuard: CanActivateFn = (route, state) => {
    const service =inject (AuthService);

    
const roles:any[]=service.getRoles();

  const router= inject (Router);


if (roles.some(role => role === 'ROLE_ADMIN')) {
  console.log("El rol 'role_admin' existe en el array.");
  return true
} else if(service.user.isAuth){
  console.log("El rol 'role_admin' no existe en el array.");
    router.navigate(['/forbidden'])
      return false;

}else{
      router.navigate(['/login'])
            return false;


}



 
  

};
