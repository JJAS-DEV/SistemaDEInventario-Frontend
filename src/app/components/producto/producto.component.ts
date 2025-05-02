import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProveedorSharingDatosService } from '../../services/proveedor-sharing-datos.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ServicespaginadoService } from './entrada-productos/services/servicespaginado.service';
import { LOAD_WASM, NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/Role';



@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterModule, MatPaginatorModule, NgxScannerQrcodeComponent, ReactiveFormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit, AfterViewInit {
  productos: Producto[] = [];
  productosPaginados: any[] = [];
  pageIndex = 0;
  pageSize = 5;
  escanerActivo: boolean = false; // Controla la visibilidad del escáner

  @ViewChild('action', { static: false }) action!: NgxScannerQrcodeComponent;
  scannedData: string | null = null;

  constructor(private service: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    private sharingData: ProveedorSharingDatosService,
    private servicepaginado: ServicespaginadoService,
    private sanitizer: DomSanitizer, 
    private authService:AuthService
  ) {
    LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();
    this.roles=authService.getRoles();


  }
  roles:Role[];
  ngAfterViewInit(): void {
    this.action.data.subscribe((data: any) => {
      try {
        const contenido = JSON.parse(data[0].value); // convierte el string a objeto
        this.scannedData = contenido.codigo;

     
     
        console.log('Nombre escaneado:', this.scannedData);
        this.buscador = this.scannedData!;

        this.service.buscarProductosByCodigo(this.scannedData!).subscribe(productos => {
          this.productos = []
          this.productos.push(productos)

          this.productosPaginados = this.servicepaginado.actualizarPaginacion(this.productos);



          // Si ya tienes proveedores, actualiza la paginación inmediatamente

        });
      } catch (e) {
        console.error('QR inválido o no contiene un objeto JSON válido:', e);
        this.scannedData = 'QR no válido';
      }
    });
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(producto => {
      // Cargar los proveedores cuando la respuesta esté lista
      this.productos = producto;

      if (this.productos.length > 0) {
        this.productosPaginados = this.servicepaginado.actualizarPaginacion(this.productos);
      }
      // Si ya tienes proveedores, actualiza la paginación inmediatamente

    });


  }




  cambiarPagina(event: any, lista: any[]) {
    this.productosPaginados = this.servicepaginado.cambiarPagina(event, lista);

  }
  buscador: string = '';


  escucharInput(event: any): void {
    this.buscador = event.target.value; // Asigna el valor del input al texto
    console.log("Texto ingresado: ", this.buscador);
    this.productos = []

    this.productosPaginados = this.servicepaginado.actualizarPaginacion(this.productos);



    this.service.buscarProductosByNombre(this.buscador).subscribe(productos => {
      // Cargar los proveedores cuando la respuesta esté lista
      this.productos = productos;
      this.productosPaginados = this.servicepaginado.actualizarPaginacion(this.productos);



      // Si ya tienes proveedores, actualiza la paginación inmediatamente

    });

  }


  //----------------------------------------------------------eleminar producto----------------------------------

  removeProducto(id: number): void {

    Swal.fire({
      title: "estas seguro que quieres eliminar?",
      text: "el dato del usui sera eliminado del sistema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.remove(id).subscribe(() => {
          this.productos = this.productos.filter(producto => producto.id != id);


        });





        Swal.fire({
          title: "eliminado!",
          text: "usuario eliminado con exito",
          icon: "success"
        });
        this.router.navigate(['/proveedor/form'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['/productos']);
        });
      }
    });


  }

  //escanear codigo

  scanear: boolean = false



  scanearcodigo():void{
    if(this.scanear){
      this.scanear=false
    }
    this.scanear=true
  }
}

