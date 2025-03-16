import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { EntradaProductos } from '../models/productoEntrada';

@Injectable({
  providedIn: 'root'
})
export class EntradaProductoService {

  private url: string = 'http://localhost:8080/api/entradaProducto'

  constructor(private http: HttpClient) { }

  create(Listproducto: Producto[]): Observable<Producto[]> {
      return this.http.post<Producto[]>(this.url, Listproducto);
    }
    findById(id: number): Observable<EntradaProductos> {
      return this.http.get<EntradaProductos>(`${this.url}/${id}`)
    }

    findAll(): Observable<EntradaProductos[]> {
      return this.http.get<EntradaProductos[]>(this.url)
    }
    update(productos: Producto[], id: number): Observable<Producto[]> {
     console.log( `${this.url}/${id}`);
      return this.http.put<Producto[]>(`${this.url}/${id}`,  productos ); // Enviar el array directamente
  }
  
    

}
