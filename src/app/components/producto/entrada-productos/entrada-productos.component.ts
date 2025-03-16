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
    this.proveedor_selecc = false;
    this.producto.proveedor = proveedor;
    this.provedorSeleccionado=proveedor;


    this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);


    this.productoService.productosbyproveedor(proveedor.id).subscribe(producto => {
     
      // Cargar los proveedores cuando la respuesta esté lista
      this.productos = producto;


      // Si ya tienes proveedores, actualiza la paginación inmediatamente
      if (this.proveedores.length > 0) {
       

        this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);
        this.listaNumerosDiferentes = this.productos.map(producto => ({
          id: producto.id,
          cantidad: producto.stock
        }));

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
    this.pageIndex=0;
    console.log("Texto ingresado: ", this.buscador);
    this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);
    this.productos.forEach(p => {
        
      p.stock=1; // Asignar el stock a 1
    });

    if (this.buscador != "") {
      alert(this.provedorSeleccionado.id);

      this.productoService.buscarProductosByProvedor(this.buscador, this.provedorSeleccionado.id).subscribe(productos => {
        // Cargar los proveedores cuando la respuesta esté lista
      
        this.productos=productos
        this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);


        // Si ya tienes proveedores, actualiza la paginación inmediatamente
        if (this.proveedores.length > 0) {

          this.proveedoresPaginados = this.servicepaginado.actualizarPaginacion(this.productos);

        }
      });


    } else if (this.buscador === "") {
      this.productoService.findAll().subscribe(productos => {
     

        
        // Cargar los proveedores cuando la respuesta esté lista
         this.productos= productos;

        // Si ya tienes proveedores, actualiza la paginación inmediatamente

        // Si ya tienes proveedores, actualiza la paginación inmediatamente
        if (this.proveedores.length > 0) {
          

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