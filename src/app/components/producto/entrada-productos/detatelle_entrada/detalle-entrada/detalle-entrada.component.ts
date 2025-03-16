import { Component, OnInit } from '@angular/core';
import { EntradaProductos } from '../../../../../models/productoEntrada';
import { EntradaProductoService } from '../../../../../services/entrada-producto.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoProductoEntrada } from '../../../../../models/ProductoProductoEntrada';

@Component({
  selector: 'app-detalle-entrada',
  standalone: true,
  imports: [],
  templateUrl: './detalle-entrada.component.html',
  styleUrl: './detalle-entrada.component.css'
})
export class DetalleEntradaComponent implements OnInit {
  entrada:EntradaProductos;
  service: EntradaProductoService;

  producto:ProductoProductoEntrada[]=[];


  constructor(service: EntradaProductoService,      private route: ActivatedRoute,
  ){
    this.entrada=new EntradaProductos;
    this.service = service;



  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.service.findById(id).subscribe(entrada => this.entrada=entrada);
      this.producto=this.entrada.productos;  
      }
      
    })


  }
  





}
