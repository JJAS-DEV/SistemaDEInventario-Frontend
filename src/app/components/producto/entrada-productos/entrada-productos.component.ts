import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosSharingDatosService } from '../../../services/productos/productos-sharing-datos.service';

import { Proveedores } from '../../../models/proveedores';
import { ProvedorserviceService } from '../../../services/provedorservice.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProducFormserviceService } from '../produc-form/produc-formservice.service';
import { ServicespaginadoService } from './services/servicespaginado.service';
import Swal from 'sweetalert2';
import { EntradaProductoService } from '../../../services/entrada-producto.service';
import { EntradaProductoFuncionesService } from './services/entrada-producto-funciones.service';

@Component({
  selector: 'app-entrada-productos',
  standalone: true,
  imports: [FormsModule, CommonModule, MatPaginatorModule, ReactiveFormsModule],
  templateUrl: './entrada-productos.component.html',
  styleUrl: './entrada-productos.component.css'
})
export class EntradaProductosComponent implements OnInit {

  producto: Producto;
  proveedores: Proveedores[] = [];
  proveedor_selecc: boolean = true;
  pageIndex = 0;
  pageSize = 5;
  proveedoresPaginados: any[] = [];
  productos: Producto[] = [];
  productos_seleccionado: Producto[] = [];
  errors: any = {};
  producto_new: boolean = false;
  private entradaProductoService = EntradaProductoService;



  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private sharingData: ProductosSharingDatosService,
    private service: ProducFormserviceService,
    private serviceprovedor: ProvedorserviceService,
    private servicepaginado: ServicespaginadoService,
    private entradaProductosFunciones: EntradaProductoFuncionesService



  ) {
    this.producto = new Producto();
    this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.proveedores);



  }
  ngOnInit(): void {
    this.sharingData.errorsUSerFormEvenEmitter.subscribe(errors => this.errors = errors);

 this.serviceprovedor.findAll().subscribe(proveedorees=>{
  this.proveedores=proveedorees;
  this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.proveedores);

 } 

 )


  }

  buscador: string = ''; // Almacena el texto ingresado
  

  escucharInput(event: any): void {
    this.buscador = event.target.value; // Asigna el valor del input al texto
    console.log("Texto ingresado: ", this.buscador);
    this.productos = []

    if (this.buscador != "") {
      this.serviceprovedor.findBynombre(this.buscador).subscribe(proveedores => {
        // Cargar los proveedores cuando la respuesta esté lista
        this.proveedores = proveedores;
        this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.proveedores);
        


        // Si ya tienes proveedores, actualiza la paginación inmediatamente
        if (this.proveedores.length > 0) {

          this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.proveedores);

        }
      });


    } else if (this.buscador === "") {
      this.serviceprovedor.findAll().subscribe(proveedores => {
        // Cargar los proveedores cuando la respuesta esté lista
        this.proveedores = proveedores;

        // Si ya tienes proveedores, actualiza la paginación inmediatamente

        // Si ya tienes proveedores, actualiza la paginación inmediatamente
        if (this.proveedores.length > 0) {

          this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.proveedores);

        }
      });


    }





  }
  listaNumerosDiferentes: { id: number, cantidad: number }[] = [];

  provedorSeleccionado: Proveedores = new Proveedores();
  seleccionado(proveedor: Proveedores) {
    this.producto.proveedor = proveedor;
    this.provedorSeleccionado = proveedor;
  
    // Mostrar un indicador de carga mientras se obtiene la respuesta
    this.proveedor_selecc = true; 
  
    // Llamada al servicio para obtener los productos por proveedor
    this.productoService.productosbyproveedor(proveedor.id).subscribe({
      next: (producto) => {
        // Se ejecuta cuando la respuesta de la API es exitosa
        this.productos = producto;
  
       
      },
      error: (error) => {
        // Manejo de errores
        console.error('Error al obtener productos del proveedor:', error);
        alert('Hubo un error al obtener los productos del proveedor.');
      },
      complete: () => {
         // Si hay productos, actualizar la paginación
         if (this.productos.length > 0) {
          this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);
  
          // Crear lista de cantidades de stock de cada producto
          this.listaNumerosDiferentes = this.productos.map(prod => ({
            id: prod.id,
            cantidad: prod.stock
          }));
        } else {
          // Si no hay productos, limpiar la lista paginada
          this.proveedoresPaginados = [];
        }
  
        alert(`Proveedor seleccionado: ${proveedor.id}`);
        // Se ejecuta cuando la petición finaliza exitosamente (con o sin datos)
        this.proveedor_selecc = false; // Ocultar el indicador de carga
      }
    });
  }
  bucarStockexistente(id:number){
    return this.listaNumerosDiferentes.find(producto => producto.id === id)?.cantidad;

   
  }

  onSubmit(provedorForm: NgForm): void {


    this.validarProducto(this.producto);


    // }

    // userForm.reset();
    // userForm.resetForm();

  }


  cambiarPagina(event: any, lista: any[]) {
    this.proveedoresPaginados = this.servicepaginado.cambiarPagina(event, lista);


  }

  agregarProductoAlista(productos: Producto, stock_entrada:any) {


    let productoNuevo=productos;

    productoNuevo.stock=stock_entrada;

    if (!productoNuevo.stock || productoNuevo.stock.toString().trim() === "") {
      alert("Debe ingresar una cantidad válida.");
      return; // Detener la ejecución si está vacío
    }

    // Convertir cantidad a número
    const cantidad = Number(productoNuevo.stock);

    // Validar que la cantidad no sea negativa, cero o NaN
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("La cantidad debe ser un número positivo.");
      return; // Detener la ejecución si el número es inválido
    }



    let productoExistente = this.productos_seleccionado.find(prod => prod.nombre === productoNuevo.nombre);

    if (productoExistente) {
      // Si existe, aumentar la cantidad
      productoExistente.stock = Number(productoExistente.stock) + Number(productoNuevo.stock);
    } else {

      this.productos_seleccionado.push({ ...productoNuevo }); // Agrega copia del producto

    }

  }

  eliminarProducto(nombreProducto: string) {
    alert(nombreProducto)


    this.productos_seleccionado = this.productos_seleccionado.filter(producto => producto.nombre !== nombreProducto);
  }

  camabiarProveedor() {
    window.location.reload();

  }

  crearPRoducto() {
    this.producto_new = true;

  }



  validarProducto(producto: Producto) {

  
    this.productoService.validarProducto(producto).subscribe({

      next: (productonew) => {

        this.agregarProductoAlista(producto, producto.stock);



        console.log(productonew)
        alert("entro aqui")
        this.producto_new = false
        producto.nombre = "";
        producto.stock = 0;
        producto.precio = 0;
        this.errors={};

        return true

      },


      error: (err) => {

        // console.log(err.error)
        if (err.status == 400) {
          Swal.fire(
            'Error en el registro',
            err.error.message,
            'error'
          );
          this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);



        }else if (err == null){

        Swal.fire(
          'Error en el registro',
          err.error.message,
          'error'
        );
        this.sharingData.errorsUSerFormEvenEmitter.emit(err.error);

      }

      }
    });

  





  }

  crearEntrada(productos: Producto[]) {


    this.entradaProductosFunciones.addUser(productos);




  }

  escucharInputpraBuscarProducto(event: any): void {
    this.buscador = event.target.value; // Asigna el valor del input al texto
   

    if (this.buscador != "") {

      this.productoService.buscarProductosByProvedor(this.buscador, this.provedorSeleccionado.id).subscribe(productos => {
        // Cargar los proveedores cuando la respuesta esté lista
      
        this.productos=productos
        this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);


        // Si ya tienes proveedores, actualiza la paginación inmediatamente
        if (this.productos.length > 0) {

          this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);

        }
      });



    } else if (this.buscador === "") {
      this.productoService.buscarProductosByProvedor(this.buscador, this.provedorSeleccionado.id).subscribe(productos => {
     

        
        // Cargar los proveedores cuando la respuesta esté lista
         this.productos= productos;
         this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);

        // Si ya tienes proveedores, actualiza la paginación inmediatamente

        // Si ya tienes proveedores, actualiza la paginación inmediatamente
        if (this.productos.length > 0) {
          

          this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);

        }
      });


    }




  }

  cerraformularioProducto(){
    alert("entro aqui")
    this.producto_new = false
    this.errors={};


    

  }



}