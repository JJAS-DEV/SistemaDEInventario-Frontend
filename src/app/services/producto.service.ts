import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url: string = 'http://localhost:8080/api/productos'


  constructor(private http: HttpClient) { }

  findAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url)
  }


  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);

  }

  create(user: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, user);
  }
  update(user: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${user.id}`, user);
  }
  findById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`)
  }

  productosbyproveedor(id:number): Observable<Producto[]> {
    return this.http.post<Producto[]>(`${this.url}/provedor`,{ proveedor_id: id })
  }

  validarProducto(producto:Producto):Observable<boolean>{
    return this.http.post<boolean>(`${this.url}/validarProducto`,producto);
  }

  
  buscarProductosByProvedor(name: string, idProveedor: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/buscar`, {
      params: { name, idProveedor: idProveedor.toString() }
    });
  }
  buscarProductosByNombre(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/buscarXnombre`, {
      params: {name}
    });
  }

  buscarProductosByCodigo(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.url}/buscarXcodigo`, {
      params: {codigo}
    });
  }  


}
