import { Component, OnInit,LOCALE_ID } from '@angular/core';
import { ProductoService } from '../../../../../services/producto.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Producto } from '../../../../../models/producto';
import { ServicespaginadoService } from '../../../entrada-productos/services/servicespaginado.service';
import { SalidadProducto } from '../../../../../models/SalidadProducto';
import { ProductoSalidad } from '../../../../../models/ProductoSalidad';
import { AuthService } from '../../../../../services/auth.service';
import { SalidadServiceService } from '../service/salidad-service.service';
import { ActivatedRoute } from '@angular/router';
import { SalidadServicesService } from '../../../../../services/ServiceListaSalidad/salidad-services.service';
import localeEs from '@angular/common/locales/es'; 
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-crear-salidad',
  standalone: true,
  imports: [FormsModule, CommonModule, MatPaginatorModule, ReactiveFormsModule],
  templateUrl: './crear-salidad.component.html',
  providers: [DatePipe,  { provide: LOCALE_ID, useValue: 'es' }]

})
export class CrearSalidadComponent implements OnInit {

  pageIndex = 0;
  pageSize = 5;
  listapaginados: any[] = [];
  productos: Producto[] = [];
  salidadProducto:SalidadProducto=new SalidadProducto();
  
  


  

  
constructor(
 private productoService:ProductoService, private servicepaginado: ServicespaginadoService
 ,private authService:AuthService,private serviceSalidad:SalidadServiceService,    private route: ActivatedRoute,private salidadServicesService:SalidadServicesService
,private datePipe: DatePipe
 
  ){
    
this.salidadProducto.usuarioResponsable=authService.getUsername();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.salidadServicesService.findById(id).subscribe(salidadProducto =>{
          this.salidadProducto=salidadProducto;
          this.salidadProducto.usuarioResponsable=this.authService.getUsername();

        });


      }


      
    
    }
    )
    
  }

  

  buscador: string = '';

  escucharInput(event: any): void {
    this.buscador = event.target.value; // Asigna el valor del input al texto
    console.log("Texto ingresado: ", this.buscador);
    this.productos = []

    this.listapaginados = this.servicepaginado.actualizarPaginacion( this.productos);


   
      this.productoService.buscarProductosByNombre(this.buscador).subscribe(productos => {
        // Cargar los proveedores cuando la respuesta esté lista
        this.productos = productos;
        this.listapaginados = this.servicepaginado.actualizarPaginacion( this.productos);
        


        // Si ya tienes proveedores, actualiza la paginación inmediatamente
      
      });

   
    





      


   


    







}

calcularPrecioTotal(cantidad: number, precioUnitario: number): number {
  if (!cantidad || !precioUnitario) return 0;
  return cantidad * precioUnitario;
}
cambiarPagina(event: any, lista: any[]) {
this.servicepaginado.cambiarPagina(event, lista);


}

agregarProductoAlista(productos: Producto, stock_entrada:any) {


  alert("entro Aquii"+ productos.nombre+" "+stock_entrada  )
  console.log(this.salidadProducto)

  if (!stock_entrada || stock_entrada.toString().trim() === "") {
    alert("Debe ingresar una cantidad válida.");
    return; // Detener la ejecución si está vacío
  }

  // Convertir cantidad a número

  // Validar que la cantidad no sea negativa, cero o NaN
  if (isNaN(stock_entrada) || stock_entrada <= 0) {
    alert("La cantidad debe ser un número positivo.");
    return; // Detener la ejecución si el número es inválido
  }
if(productos.stock<stock_entrada){
  alert("La cantidad  debe no puede ser mayor al stock");
    return; 

}



  let productoExistente = this.salidadProducto.productos.find(prod =>prod.producto.nombre === productos.nombre);

  if (productoExistente) {
    // Si existe, aumentar la cantidad
alert("entro Aqui en existe")
let verificando= Number(productoExistente.cantidad) + Number(stock_entrada);
if(productos.stock<verificando){
  alert("La cantidad  debe no puede ser mayor al stock");
    return; 

}

    productoExistente.cantidad=Number(productoExistente.cantidad) + Number(stock_entrada);
  } else {
    alert("entro Aqui en no existe")


    this.salidadProducto.productos.push({
      producto: productos,
      cantidad: Number(stock_entrada)
    });
  }

}

  eliminarProducto(nombreProducto: string) {
    alert(nombreProducto)


    this.salidadProducto.productos = this.salidadProducto.productos.filter(producto => producto.producto.nombre !== nombreProducto);
  }



  crearSalidad( salidadProducto:SalidadProducto) {
    this.serviceSalidad.creandoEntrada(salidadProducto);

    




  }
}



