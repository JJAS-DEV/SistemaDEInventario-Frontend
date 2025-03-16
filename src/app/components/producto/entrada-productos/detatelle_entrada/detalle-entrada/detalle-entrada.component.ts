import { Component, OnInit } from '@angular/core';
import { EntradaProductos } from '../../../../../models/productoEntrada';
import { EntradaProductoService } from '../../../../../services/entrada-producto.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoProductoEntrada } from '../../../../../models/ProductoProductoEntrada';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../../../models/producto';
import { Observable, of } from 'rxjs';
import { ProductoService } from '../../../../../services/producto.service';

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
  async EnviarListaModificado(productosModificdos: ProductoProductoEntrada[]) {
    const promesas = productosModificdos.map(producto =>
      new Promise<void>((resolve, reject) => {
        this.productoservice.findById(producto.producto.id).subscribe({
          next: (pr: Producto) => {
            console.log('Producto cargado con éxito:', pr);
  
  
              if (!producto.producto.stock || producto.producto.stock.toString().trim() === "") {
                alert("Debe ingresar una cantidad válida. " + producto.producto.nombre);
                reject("Cantidad inválida");
              } else if (isNaN(producto.producto.stock) || producto.producto.stock <= 0) {
                alert("La cantidad debe ser un número positivo. " + producto.producto.nombre);
                reject("Cantidad negativa o no numérica");
              } else {
                alert("Se pudo modificar");
                producto.producto.stock = producto.cantidad;
                this.productosmodficados.push(producto.producto);
                resolve();
              }
          
          },
          error: (error) => {
            console.error('Error al obtener el producto:', error);
            reject(error);
          }
        });
      })
      
    );
    try {
      await Promise.all(promesas); // Espera que todas las peticiones terminen
      console.log("Todos los productos han sido procesados.");
      this.enviarActualizacion(); // Llamar la función cuando todo esté listo
    } catch (error) {
      console.error("Error en el procesamiento:", error);
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
