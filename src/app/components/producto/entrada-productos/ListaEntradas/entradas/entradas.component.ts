import { Component, OnInit } from '@angular/core';
import { EntradaProductoService } from '../../../../../services/entrada-producto.service';
import { EntradaProductoFuncionesService } from '../../services/entrada-producto-funciones.service';
import { EntradaProductos } from '../../../../../models/productoEntrada';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ServicespaginadoService } from '../../services/servicespaginado.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,RouterModule ],
  templateUrl: './entradas.component.html',
  providers: [DatePipe]

})

export class EntradasComponent implements OnInit {
  private entradaProductoService: EntradaProductoFuncionesService;
  listaEntrada: EntradaProductos[] = [];
  service: EntradaProductoService;
  pageIndex = 0;
  pageSize = 5;
  listaEntradasPaginados: any[] = [];


  constructor(entradaProductoService: EntradaProductoFuncionesService, service: EntradaProductoService
    , private datePipe: DatePipe,
        private servicepaginado: ServicespaginadoService,
               private router: Router,
                  private route : ActivatedRoute,
        
    
  ) {
    this.entradaProductoService = entradaProductoService;
    this.service = service;

    this.service.findAll().subscribe(listaEntrada=>{
      this.listaEntrada=listaEntrada;
      this.listaEntradasPaginados = this.servicepaginado.actualizarPaginacion(this.listaEntrada);
     
    
    
     } )

  }
  fecha: string = "";

  ngOnInit(): void {
    this.service.findAll().subscribe(listaEntrada => {

      this.listaEntrada = listaEntrada;

      this.listaEntrada.forEach(entrda => {
        this.datePipe.transform(entrda.fecha, 'dd/MM/yyyy HH:mm:ss');
      }

      )




    })
  }
  cambiarPagina(event: any, lista: any[]) {
    this.listaEntradasPaginados = this.servicepaginado.cambiarPagina(event, lista);


  }



}
