import { Injectable } from '@angular/core';
import { SalidadProducto } from '../../../../../models/SalidadProducto';
import { Router } from '@angular/router';
import { SalidadServicesService } from '../../../../../services/ServiceListaSalidad/salidad-services.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SalidadServiceService {


  constructor( private router: Router,private salidadServicesService:SalidadServicesService

  )
 { 
}

creandoEntrada(salidadProducto: SalidadProducto) {
  if(salidadProducto.id>0){
    this.salidadServicesService.update(salidadProducto).subscribe({
      next: (productonew) => {
        console.log(productonew);
  
        Swal.fire({
          title: "modificado",
          text: "modificado con éxito",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
  
      },
      error: (err) => {
        if (err.status == 400) {
          Swal.fire(
            'Error en el registro',
            err.error.message,
            'error'
          );
        }
      }
    });


  }else{
    this.salidadServicesService.create(salidadProducto).subscribe({
      next: (productonew) => {
        console.log(productonew);
  
        Swal.fire({
          title: "Guardado",
          text: "Guardado con éxito",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
  
      },
      error: (err) => {
        if (err.status == 400) {
          Swal.fire(
            'Error en el registro',
            err.error.message,
            'error'
          );
        }
      }
    });
  }

  }

  removeProveedor(id:number):void {
  
        Swal.fire({
          title: "estas seguro que quieres eliminar los datos?",
          text: "los datos sera eliminado del sistema",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "si"
        }).then((result) => {
          if (result.isConfirmed) {
            this.salidadServicesService.remove(id).subscribe(()=>{
              Swal.fire({
                title: "eliminado",
                text: "eliminado con éxito",
                icon: "success"
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            
    
            });
  
  
  
  
          }
        });
  
  
  
  
    }
 
}