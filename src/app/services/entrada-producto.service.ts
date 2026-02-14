import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { EntradaProductos } from '../models/productoEntrada';
import { entradaRequest } from '../models/entradaRequest';

@Injectable({
  providedIn: 'root'
})
export class EntradaProductoService {

  private url: string = 'http://localhost:8080/api/entradaProducto'

  constructor(private http: HttpClient) { }


    create(Listproducto: entradaRequest): Observable<entradaRequest> {
      return this.http.post<entradaRequest>(this.url, Listproducto);
    }

    
    findById(id: number): Observable<EntradaProductos> {
      return this.http.get<EntradaProductos>(`${this.url}/${id}`)
    }

    findAll(): Observable<EntradaProductos[]> {
      return this.http.get<EntradaProductos[]>(this.url)
    }
    update(productos: entradaRequest, id: number): Observable<entradaRequest> {
     console.log( `${this.url}/${id}`);
      return this.http.put<entradaRequest>(`${this.url}/${id}`,  productos ); // Enviar el array directamente
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);

  }
    

}
