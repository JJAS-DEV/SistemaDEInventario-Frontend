import { Component, OnInit } from '@angular/core';
import { SalidadProducto } from '../../../models/SalidadProducto';
import { SalidadServicesService } from '../../../services/ServiceListaSalidad/salidad-services.service';
import { ServicespaginadoService } from '../entrada-productos/services/servicespaginado.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SalidadServiceService } from './crearSalidad/service/salidad-service.service';


@Component({
  selector: 'app-salidad-producto',
  standalone: true,
  imports: [MatPaginatorModule,CommonModule,RouterModule],
  templateUrl: './salidad-producto.component.html',
  providers: [DatePipe]
  
})
export class SalidadProductoComponent implements OnInit {

  salidadProducto:SalidadProducto[]=[];
  pageIndex = 0;
  pageSize = 5;
  listapaginados: any[] = [];

  constructor(private salidadServicesService:SalidadServicesService, private servicepaginado: ServicespaginadoService,private datePipe: DatePipe
  ,private router: Router,private SalidadServiceServices:SalidadServiceService

  ){
    

  }
  
  
  ngOnInit(): void {
    this.getSalidas();

  }
  

  getSalidas(): void {
    this.salidadServicesService.findAll().subscribe({
      next: (data) => {
        
        this.salidadProducto = data;
        this.salidadProducto.forEach(entrda => {
          this.datePipe.transform(entrda.fecha, 'dd/MM/yyyy HH:mm:ss');

        });
        console.log("salidad PRoducto:",this.salidadProducto)
    this.listapaginados = this.servicepaginado.actualizarPaginacion(this.salidadProducto);

        
        
      },
      error: (err) => {
        console.error('Error al cargar salidas:', err);
      }
    });
  }

  cambiarPagina(event: any, lista: any[]) {
    this.listapaginados = this.servicepaginado.cambiarPagina(event, lista);


  }
  onRemoveUser(id:number):void {
    this.SalidadServiceServices.removeProveedor(id);
  }

  

}
