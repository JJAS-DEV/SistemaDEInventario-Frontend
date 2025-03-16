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
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {

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
            this.producto.forEach(producto=>{
              
              this.productosmodficados.push(producto.producto,
                

              );
            })
    
            console.log("Lista de productos:", this.listaNumerosDiferentes); 
            console.log("Lista de productos modificados:", this.productosmodficados);  // Verifica la lista
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
    productosModificdos.forEach(producto=>{
      console.log(producto.producto.id)
     this.productoservice.findById(producto.producto.id).subscribe( {
      next: (pr: Producto) => {
        // Aquí manejas la respuesta exitosa
        this.productod = pr;
        console.log('Producto cargado con éxito:', this.productod);
    
        // Aquí puedes continuar con otras operaciones después de cargar el producto
      },
      error: (error) => {
        // Aquí manejas cualquier error que ocurra
        console.error('Error al obtener el producto:', error);
      },
      complete: () => {
        // Aquí puedes ejecutar código cuando la suscripción termine
        console.log(this.productod.nombre)
        if(this.productod.stock>=this.buscarProducto(producto.producto.id)!){
          const cantidads = Number(producto.producto.stock);

    if (!producto.producto.stock || producto.producto.stock.toString().trim() === "") {
      alert("Debe ingresar una cantidad válida."+producto.producto.nombre);
       // Detener la ejecución si está vacío
       
    }else if (isNaN(cantidads) || producto.producto.stock <= 0) {
      alert("La cantidad debe ser un número positivo."+producto.producto.nombre);
       // Detener la ejecución si el número es inválido
    }else{

      alert("se pudo modificar")
    }

    


   }else{

    console.log("poducto no se puede modificar"+this.productod.stock)
    
   }
      }
    });

    


    })

  }



}
