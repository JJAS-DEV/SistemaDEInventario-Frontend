import { Component, OnInit } from '@angular/core';
import { EntradaProductos } from '../../../../../models/productoEntrada';
import { EntradaProductoService } from '../../../../../services/entrada-producto.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoProductoEntrada } from '../../../../../models/ProductoProductoEntrada';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../../../models/producto';
import { Observable, of } from 'rxjs';
import { ProductoService } from '../../../../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-entrada',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './detalle-entrada.component.html',
  styleUrl: './detalle-entrada.component.css'
})
export class DetalleEntradaComponent implements OnInit {
  entrada: EntradaProductos;
  service: EntradaProductoService;
  producto: ProductoProductoEntrada[] = [];
  modificar: boolean = false;

  listaNumerosDiferentes: { id: number, cantidad: number }[] = [];
    



  constructor(service: EntradaProductoService, private route: ActivatedRoute,
    private productoservice:ProductoService
  ) {
    this.entrada = new EntradaProductos;
    this.service = service;
   
    

  }
  idPagina!:number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.idPagina=id;
        this.service.findById(id).subscribe(entrada => {
          this.entrada = entrada;  // Se asegura de tener los datos
          this.producto = this.entrada.productos;  // Asignar productos
    
          // Verificar si `productos` tiene datos
          if (this.producto && this.producto.length > 0) {
            // Llenar listaNumerosDiferentes con los datos de los productos
            this.listaNumerosDiferentes = this.producto.map(producto => ({
              id: producto.producto.id,
              cantidad: producto.cantidad
            }));
          
    
            console.log("Lista de productos:", this.listaNumerosDiferentes); 
            // Verifica la lista
          } else {
            console.warn('⚠ No hay productos disponibles.');
            this.listaNumerosDiferentes = [];  // Lista vacía si no hay productos
          }
        });

        
       
      }


    })
   

    
   
  }

 
  Ifmodificar() {
    if(this.modificar){
    this.modificar = false;
    }else{
      this.modificar = true;

    }

         
  }

  buscarProducto(idBuscado: number)  {
  return this.listaNumerosDiferentes.find(producto => producto.id === idBuscado)?.cantidad;


  }

  productosmodficados:Producto[]=[];
productod!:Producto;
   EnviarListaModificado(productosModificdos: ProductoProductoEntrada[]) {
let verificador=true;
   productosModificdos.forEach(pr=>{
      if (!pr.cantidad ||pr.cantidad.toString().trim() === "") {
        verificador=false// Detener la ejecución si está vacío
      }
  
      // Convertir cantidad a número
      const cantidad = Number(pr.cantidad);
  
      // Validar que la cantidad no sea negativa, cero o NaN
      if ( cantidad < 0) {
        verificador=false // Detener la ejecución si el número es inválido
      }
    })


  


    if(verificador){
     productosModificdos.forEach(pr=>{
      pr.producto.stock=pr.cantidad;
      this.productosmodficados.push(pr.producto)
     }) 
      this.service.update(this.productosmodficados, this.idPagina).subscribe({
        next: (response) => {
          console.log("✅ Actualización exitosa:", response);
          alert("Productos actualizados correctamente.");
        },
        error: (error) => {
          console.error("❌ Error al actualizar:", error);
          alert("Error al actualizar los productos. Revisa la consola.");
        },
        complete:() =>{


          Swal.fire({
                            title: "guardado",
                            text:  " modificado con exito ",
                            icon: "success"
                            
                          }).then((result) => {
                            // Espera a que el usuario haga clic en "Ok" y luego recarga la página
                            if (result.isConfirmed) {
                              window.location.reload();
                            }
                        })  ;



          
            
        }
      });


    }else{
       Swal.fire(
                          'Error en la modificacion',
                          'error'
                        );



    }
    
  
  }





  eliminar(id:number){

    this.entrada.productos = this.entrada.productos.filter(producto => producto.producto.id !== id);
    console.log( this.entrada.productos)


  }




  enviarActualizacion() {
      console.log(this.idPagina);
      console.log(this.productosmodficados)

      this.service.update(this.productosmodficados, this.idPagina).subscribe({
        next: (response) => {
          console.log("✅ Actualización exitosa:", response);
          alert("Productos actualizados correctamente.");
        },
        error: (error) => {
          console.error("❌ Error al actualizar:", error);
          alert("Error al actualizar los productos. Revisa la consola.");
        }
      });
  }


}
