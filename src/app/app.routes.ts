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
import { EntradasComponent } from './components/producto/entrada-productos/ListaEntradas/entradas/entradas.component';
import { DetalleEntradaComponent } from './components/producto/entrada-productos/detatelle_entrada/detalle-entrada/detalle-entrada.component';
import { Error404Component } from './components/forbidden403/error404/error404.component';
import { SalidadProductoComponent } from './components/producto/salidad-producto/salidad-producto.component';
import { CrearSalidadComponent } from './components/producto/salidad-producto/crearSalidad/crear-salidad/crear-salidad.component';
import { DetallesSalidasComponent } from './components/producto/salidad-producto/detalles/detalles-salidas/detalles-salidas.component';
import { PruebaScanerComponent } from './components/prueba/prueba-scaner/prueba-scaner.component';
import { DetallesproductosComponent } from './components/producto/detalles/detallesproductos/detallesproductos.component';
import { IndexComponent } from './components/index/index.component';
import { adminguardGuard } from './guards/admin/adminguard.guard';
import { CreacionpdfComponent } from './components/producto/entrada-productos/creacionpdf/creacionpdf.component';

export const routes: Routes = [
  
  
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/login'
  },
  
    {path:'users',


    component:UserComponent,
        canActivate:[authGuard,adminguardGuard]


},
{ path:'users/page/:page',


  component:UserComponent,
  

},

{
    path:'users/create',
    component:UserFormComponent,
    canActivate:[authGuard,adminguardGuard]

},
{
    path:'users/edit/:id',
    component:UserFormComponent,
    
},
{
path:'proveedor/edit/:id',
component:FormProvedor,

},


{
  path:'login',
  component:AuthComponent
},
{
  path:'provedores',
  component:ProvedoresComponent,
},

{
  path: 'forbidden',
  component:Forbidden403Component

  
},
{
  path: 'proveedor/form',
  component:FormProvedor,
},

{
  path: 'productos',
  component:ProductoComponent,
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

},
{
path:'ListaDeEntradas',
component:EntradasComponent

},
{path:'entradaproducto/detalle/:id',
  component:DetalleEntradaComponent,
  
  },

  {path:'salidadProductos',
    component:SalidadProductoComponent,
    
    },


    {path:'crar-salidadProductos',
      component:CrearSalidadComponent,
      
      },

      {
        path:'crar-salidadProductos/:id',
      component:CrearSalidadComponent,
      },

      {path:'salidadProdutos/detalle/:id',
        component:DetallesSalidasComponent,
        
        },
        {path:'productos/detalle/:id',
          component:DetallesproductosComponent,
          
          },
        {path:'salidadProdutos/pruebaScarner',
          component:PruebaScanerComponent,
          
          },
          {path:'index',
            component:IndexComponent,
                    canActivate:[authGuard]

            },{path:'generacionPdf',
            component:CreacionpdfComponent,

            },
  







        




  { path: '**', component: Error404Component }
];
