import { Injectable } from '@angular/core';
import { Proveedores } from '../../../../models/proveedores';
import { Producto } from '../../../../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ServicespaginadoService {

  constructor() { 
    this.producto = new Producto();

  }
   producto:Producto;
      proveedores: Proveedores[] = [];
  
      pageIndex = 0; 
      pageSize = 5;
      proveedoresPaginados: any[] = []; 
  
       productos:Producto[]=[];

  cambiarPagina(event: any ,lista: any[]) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    return this.proveedoresPaginados = lista.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);

  }

  actualizarPaginacion(lista: any[]
  ) {
    this.proveedoresPaginados = lista.slice(
      this.pageIndex * this.pageSize, 
      (this.pageIndex +1) * this.pageSize
      

    );
    return this.proveedoresPaginados;

  }




}
