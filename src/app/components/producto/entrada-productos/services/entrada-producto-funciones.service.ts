import { Injectable } from '@angular/core';
import { EntradaProductoService } from '../../../../services/entrada-producto.service';
import { Producto } from '../../../../models/producto';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EntradaProductoFuncionesService {

  constructor(
   private entradaService: EntradaProductoService
  ) { }


    addUser(productos: Producto[]): void {
         this.entradaService.create(productos).subscribe({
      
              next: (productonew) => {
      
      
                console.log(productonew)
      
                Swal.fire({
                  title: "guardado",
                  text:  " guardado con exito ",
                  icon: "success"
                });
                window.location.reload();

      
              },
              error: (err) => {
      
                // console.log(err.error)
                if (err.status == 400) {
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
