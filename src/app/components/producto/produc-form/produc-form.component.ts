import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosSharingDatosService } from '../../../services/productos/productos-sharing-datos.service';
import { ProducFormserviceService } from './produc-formservice.service';
import { Proveedores } from '../../../models/proveedores';
import { ProvedorserviceService } from '../../../services/provedorservice.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-produc-form',
  standalone: true,
  imports: [FormsModule, CommonModule,MatPaginatorModule],
  templateUrl: './produc-form.component.html',
})
export class ProducFormComponent  implements OnInit{

    producto:Producto;
    proveedores: Proveedores[] = [];

    pageIndex = 0; 
    pageSize = 5;
     proveedoresPaginados: any[] = []; 

     productos:Producto[]=[];
  

  


  
  errors:any={};

  constructor(
      private productoService: ProductoService,
      private route: ActivatedRoute,
      private sharingData: ProductosSharingDatosService,
      private service:ProducFormserviceService,
      private serviceprovedor:ProvedorserviceService
    ) { 
      this.producto = new Producto();
  
  
  
    }
  ngOnInit(): void {
    this.sharingData.errorsUSerFormEvenEmitter.subscribe(errors=> this.errors= errors);
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.productoService.findById(id).subscribe(producto => this.producto=producto);
      }
    })
  }

onClear(provedorForm: NgForm): void {
    this.producto = new Producto();
    provedorForm.reset();
    provedorForm.resetForm();
    

  }

  
  onSubmit(provedorForm: NgForm): void {
  
              
    console.log(this.producto);
    this.service.addUser(this.producto);
  // }

  // userForm.reset();
  // userForm.resetForm();

}

  //agregando buscador 

  buscador: string = ''; // Almacena el texto ingresado

  escucharInput(event: any): void {
    this.buscador = event.target.value; // Asigna el valor del input al texto
    console.log("Texto ingresado: ", this.buscador);

    if(this.buscador!="")
      {
        this.serviceprovedor.findBynombre(this.buscador).subscribe(proveedores => {
          // Cargar los proveedores cuando la respuesta esté lista
          this.proveedores = proveedores;
    
          // Si ya tienes proveedores, actualiza la paginación inmediatamente
          if (this.proveedores.length > 0) {
            this.actualizarPaginacion(this.proveedores);
          }
        });
      }else if(this.buscador===""){
        this.proveedores=[];
        this.actualizarPaginacion(this.proveedores);

      }


    
    // Muestra el texto en consola


    //borrar producto 

    
  }

 

  actualizarPaginacion(     lista: any[]
  ) {
    this.proveedoresPaginados = lista.slice(
      this.pageIndex * this.pageSize, 
      (this.pageIndex +1) * this.pageSize
    );
  }

 cambiarPagina(event: any ,lista: any[]) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.proveedoresPaginados = lista.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }
provedorSeleccionado:Proveedores= new Proveedores();

  seleccionado(proveedor:Proveedores){
    this.producto.proveedor=proveedor;
   
    this.proveedores=[];
    this.productoService.productosbyproveedor(proveedor.id).subscribe(producto => {
      // Cargar los proveedores cuando la respuesta esté lista
      this.productos = producto;


     
      // Si ya tienes proveedores, actualiza la paginación inmediatamente
      
    });







  
  }


  
  
}
