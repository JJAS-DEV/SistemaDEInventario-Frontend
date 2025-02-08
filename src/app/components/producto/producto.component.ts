import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProveedorSharingDatosService } from '../../services/proveedor-sharing-datos.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterModule,MatPaginatorModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  productos: Producto[]=[];
  productosPaginados: any[] = []; 
  pageIndex = 0; 
  pageSize = 5;

  constructor(private service:ProductoService,
       private router: Router,
          private route : ActivatedRoute,
          private sharingData:ProveedorSharingDatosService,
  
     ){
  
  
     }
  
  ngOnInit(): void {
    this.service.findAll().subscribe(producto => {
      // Cargar los proveedores cuando la respuesta esté lista
      this.productos = producto;

      if (this.productos.length > 0) {
        this.actualizarPaginacion();
      }
      // Si ya tienes proveedores, actualiza la paginación inmediatamente
      
    });


  }

  actualizarPaginacion() {
    this.productosPaginados = this.productos.slice(
      this.pageIndex * this.pageSize, 
      (this.pageIndex +1) * this.pageSize
    );
  }


  cambiarPagina(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.productosPaginados = this.productos.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }


  //----------------------------------------------------------eleminar producto----------------------------------

  removeProducto(id:number):void {
  
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
            this.service.remove(id).subscribe(()=>{
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

}
