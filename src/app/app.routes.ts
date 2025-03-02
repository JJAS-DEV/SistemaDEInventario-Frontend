import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import path from 'path';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { ProvedoresComponent } from './components/provedores/provedores.component';
import { FormProvedor } from './components/provedores/form/formProvedor.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProducFormComponent } from './components/producto/produc-form/produc-form.component';
import { EntradaProductosComponent } from './components/producto/entrada-productos/entrada-productos.component';

export const routes: Routes = [
  
  
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/users'
  },
  
    {path:'users',


    component:UserComponent,
    

},
{ path:'users/page/:page',


  component:UserComponent,
  

},

{
    path:'users/create',
    component:UserFormComponent,
    canActivate:[authGuard]

},
{
    path:'users/edit/:id',
    component:UserFormComponent,
    canActivate:[authGuard]
    
},
{
path:'proveedor/edit/:id',
component:FormProvedor,
canActivate:[authGuard]

},


{
  path:'login',
  component:AuthComponent
},
{
  path:'provedores',
  component:ProvedoresComponent
},

{
  path: 'forbidden',
  component:Forbidden403Component
},
{
  path: 'proveedor/form',
  component:FormProvedor
},

{
  path: 'productos',
  component:ProductoComponent
},
{
  path: 'producto/form',
  component:ProducFormComponent
},
{
path:'producto/edit/:id',
component:ProducFormComponent,

},
{
path:'entradaproducto',
component:EntradaProductosComponent,

}

];
