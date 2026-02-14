import { Injectable } from '@angular/core';
import { EntradaProductoService } from '../../../../services/entrada-producto.service';
import { Producto } from '../../../../models/producto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EntradaProductos } from '../../../../models/productoEntrada';
import { entradaRequest } from '../../../../models/entradaRequest';


@Injectable({
  providedIn: 'root'
})
export class EntradaProductoFuncionesService {
  private listaEntrada :EntradaProductos[] =[];

  constructor(
   private entradaService: EntradaProductoService,
       private router: Router
   
  ) { }


    addUser(productos: entradaRequest): void {
         this.entradaService.create(productos).subscribe({
      
              next: (productonew) => {
      
      
                console.log(productonew)
      
                Swal.fire({
                  title: "guardado",
                  text:  " guardado con exito ",
                  icon: "success"
                  
                }).then((result) => {
                  // Espera a que el usuario haga clic en "Ok" y luego recarga la página
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
              })  ;
                


               


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

    findAlld(){

      this.entradaService.findAll();

    }

    


}
