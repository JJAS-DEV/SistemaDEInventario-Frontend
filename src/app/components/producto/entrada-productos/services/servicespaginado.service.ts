import { Injectable, OnInit } from '@angular/core';
import { Proveedores } from '../../../../models/proveedores';
import { Producto } from '../../../../models/producto';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class ServicespaginadoService {

  producto: Producto = new Producto();
  proveedores: Proveedores[] = [];
  pageIndex = 0;
  pageSize = 10;
  proveedoresPaginados: any[] = [];
  productos: Producto[] = [];

  constructor() { }

  cambiarPagina(event: any, lista: any[]): any[] {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    return this.actualizarPaginacion(lista);
  }

  actualizarPaginacion(lista: any[]): any[] {
    

    this.proveedoresPaginados = lista.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize
    );
    this.pageIndex=0;

    return this.proveedoresPaginados;
  }
}
