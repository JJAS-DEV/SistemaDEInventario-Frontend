import { Injectable } from '@angular/core';
import { ProductosSharingDatosService } from '../../../services/productos/productos-sharing-datos.service';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ProducFormserviceService {

  productos: Producto[] = [];

  constructor(

    private sharingData: ProductosSharingDatosService,
    private service: ProductoService,
    private router: Router
  ) { }



  addUser(producto: Producto): void {

    console.log("lo que llega" + producto)

    if (producto.id > 0) {
      this.service.update(producto).subscribe({
        next: (provedorUpdate) => {
          // Actualizar la lista de usuarios
          this.productos = this.productos.map(u => (u.id === provedorUpdate.id) ? { ...provedorUpdate } : u);

          // Redirigir al listado de usuarios
          this.router.navigate(['/productos']),

            Swal.fire({
              title: "actualizado",
              text: "Usuario" + provedorUpdate.nombre + " editado con exito ",
              icon: "success"
            });
        },
        error: (err) => {
          // Manejo de errores
          // console.error(err.error);

          if (err.status == 400) {
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
      this.service.create(producto).subscribe({

        next: (productonew) => {


          console.log(productonew)

          this.productos = [... this.productos, { ...productonew }];
          Swal.fire({
            title: "guardado",
            text: "Usuario" + producto.nombre + " guardado con exito ",
            icon: "success"
          });
          this.router.navigate(['/productos'])


        },
        error: (err) => {

          // console.log(err.error)
          if (err.status == 400) {
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

  validarProducto(producto: Producto) {
  this.service.validarProducto(producto).subscribe({

    next: (productonew) => {


      console.log(productonew)
      alert("entro aqui")
      return true

    },


      error: (err) => {

        // console.log(err.error)
        if (err.status == 400) {
          this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);
          Swal.fire(
            'Error en el registro',
            err.error.message,
            'error'
          );
          alert("entro aqui en falso")


        }

  }});

  }



}
