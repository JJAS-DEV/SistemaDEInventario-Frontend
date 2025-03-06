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

@Component({
  selector: 'app-entrada-productos',
  standalone: true,
  imports: [FormsModule, CommonModule,MatPaginatorModule, ReactiveFormsModule],
  templateUrl: './entrada-productos.component.html',
  styleUrl: './entrada-productos.component.css'
})
export class EntradaProductosComponent implements OnInit {

  producto:Producto;
  proveedores: Proveedores[] = [];
  proveedor_selecc:boolean=true;
  pageIndex = 0; 
  pageSize = 5;
   proveedoresPaginados:any[] = []; 
   productos:Producto[]=[];
  productos_seleccionado:Producto[]=[];
   errors:any={};

   Stock_entrada:number=1;

   numeroControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(100),
  ]);

   constructor(
         private productoService: ProductoService,
         private route: ActivatedRoute,
         private sharingData: ProductosSharingDatosService,
         private service:ProducFormserviceService,
         private serviceprovedor:ProvedorserviceService,
         private servicepaginado:ServicespaginadoService
      ) { 
         this.producto = new Producto();
     
     
     
       }
  ngOnInit(): void {
    this.sharingData.errorsUSerFormEvenEmitter.subscribe(errors=> this.errors= errors);
  

  }

  buscador: string = ''; // Almacena el texto ingresado

  escucharInput(event: any): void {
    this.buscador = event.target.value; // Asigna el valor del input al texto
    console.log("Texto ingresado: ", this.buscador);
    this.productos=[]

    if(this.buscador!="")
      {
        this.serviceprovedor.findBynombre(this.buscador).subscribe(proveedores => {
          // Cargar los proveedores cuando la respuesta esté lista
          this.proveedores = proveedores;

    
          // Si ya tienes proveedores, actualiza la paginación inmediatamente
          if (this.proveedores.length > 0) {

            this.proveedoresPaginados= this.servicepaginado.actualizarPaginacion(this.proveedores);

          }
        });
      }





    }
    provedorSeleccionado:Proveedores= new Proveedores();

  seleccionado(proveedor:Proveedores){
    this.proveedor_selecc=false;
    this.producto.proveedor=proveedor;

   
    this.productoService.productosbyproveedor(proveedor.id).subscribe(producto => {
      producto.forEach(p => {
        p.stock = 1; // Asignar el stock a 1
      });
      // Cargar los proveedores cuando la respuesta esté lista
      this.productos = producto;

    
      // Si ya tienes proveedores, actualiza la paginación inmediatamente
      if (this.proveedores.length > 0) {

        this.proveedoresPaginados= this.servicepaginado.actualizarPaginacion(this.productos);

      }
    });
  
    
    

  }

  onSubmit(provedorForm: NgForm): void {
  
              
    console.log(this.producto);
    this.service.addUser(this.producto);
  // }

  // userForm.reset();
  // userForm.resetForm();

}
onClear(provedorForm: NgForm): void {
  this.producto = new Producto();
  provedorForm.reset();
  provedorForm.resetForm();
  

}

cambiarPagina(event: any ,lista: any[]) {
   this.proveedoresPaginados=this.servicepaginado.cambiarPagina(event,lista);

 
}

agregarProductoAlista(producto:Producto){
  alert("entro")
  alert(producto.nombre)
  this.productos_seleccionado.push({ ...producto }); // Agrega copia del producto



}

eliminarProducto(nombreProducto: string) {
  alert(nombreProducto)
  

  this.productos_seleccionado = this.productos_seleccionado.filter(producto => producto.nombre !== nombreProducto);



}
}