import { Injectable } from '@angular/core';
import { ProveedorSharingDatosService } from '../../../services/proveedor-sharing-datos.service';
import { ProvedorserviceService } from '../../../services/provedorservice.service';
import { Proveedores } from '../../../models/proveedores';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  proveedores: Proveedores[] = [];

  constructor(
    private sharingData: ProveedorSharingDatosService,
    private service: ProvedorserviceService,
    private router: Router
    




    
  ) { }

   addUser(provedor:Proveedores):void {

        console.log("lo que llega"+ provedor)
  
        if (provedor.id > 0) {
          this.service.update(provedor).subscribe({
            next: (provedorUpdate) => {
              // Actualizar la lista de usuarios
               this.proveedores = this.proveedores.map(u => (u.id === provedorUpdate.id) ? { ...provedorUpdate } : u);
              
             // Redirigir al listado de usuarios
              this.router.navigate(['/provedores']),
              
        Swal.fire({
          title: "actualizado",
          text: "Usuario"+provedorUpdate.nombre+" editado con exito ",
          icon: "success"
        });
            },
            error: (err) => {
              // Manejo de errores
              // console.error(err.error);
         
                if(err.status==400){
                  this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);
                  Swal.fire(
                    'Error en el registro',
                     err.error.message,
                    'error'
                  );
      
                
  
              }
            }
          });
        }
           else {
          this.service.create(provedor).subscribe({
             
            next:(provedornew) =>{
  
            
            console.log(provedornew)
  
            this.proveedores = [... this.proveedores, { ...provedornew}];
            Swal.fire({
              title: "guardado",
              text: "Usuario"+provedor.nombre+" guardado con exito ",
              icon: "success"
            });
            this.router.navigate(['/provedores'])

  
          },
          error:(err)=>{
  
            // console.log(err.error)
            if(err.status==400){
              this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);
              Swal.fire(
                'Error en el registro',
                 err.error.message,
                'error'
              );
  
            }
          }
  
  
  
          })
  
        }
  
  
      
  
    }
removeProveedor(id:number):void {

      Swal.fire({
        title: "estas seguro que quieres eliminar?",
        text: "el dato del usui sera eliminado del sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "si"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.remove(id).subscribe(()=>{
            this.proveedores = this.proveedores.filter(proveedor => proveedor.id != id);
          
  
          });





          Swal.fire({
            title: "eliminado!",
            text: "usuario eliminado con exito",
            icon: "success"
          });
          this.router.navigate(['/proveedor/form'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/provedores']);
          });
        }
      });




  }
 

}
