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