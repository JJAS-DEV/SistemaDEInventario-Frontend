import { Component, OnInit } from '@angular/core';
import { Proveedores } from '../../models/proveedores';
import { ProvedorserviceService } from '../../services/provedorservice.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProveedorSharingDatosService } from '../../services/proveedor-sharing-datos.service';
import { FormService } from './form/form.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-provedores',
  standalone: true,
  imports: [RouterModule,MatPaginatorModule ],
  templateUrl: './provedores.component.html',
})
export class ProvedoresComponent implements OnInit {
   proveedores: Proveedores[] = [];

   pageIndex = 0; 
   pageSize = 5;
   proveedoresPaginados: any[] = [];  // Inicialización de proveedoresPaginados


   constructor(private service:ProvedorserviceService,
     private router: Router,
        private route : ActivatedRoute,
        private sharingData:ProveedorSharingDatosService,
        private servicedata: FormService

   ){


   }
  ngOnInit(): void {
    this.service.findAll().subscribe(proveedores => {
      // Cargar los proveedores cuando la respuesta esté lista
      this.proveedores = proveedores;

      // Si ya tienes proveedores, actualiza la paginación inmediatamente
      if (this.proveedores.length > 0) {
        this.actualizarPaginacion();
      }
    });



  }
  actualizarPaginacion() {
    this.proveedoresPaginados = this.proveedores.slice(
      this.pageIndex * this.pageSize, 
      (this.pageIndex +1) * this.pageSize
    );
  }

 cambiarPagina(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.proveedoresPaginados = this.proveedores.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }


  

   onSelectedUser(proveedor:Proveedores):void{
     //   this.sharingData.selectdUserEvenEmitter.emit(user);
      this.router.navigate(['/users/edit',proveedor.id]);
    }

    onRemoveUser(id:number):void {
      this.servicedata.removeProveedor(id);
    }
  




  



}
