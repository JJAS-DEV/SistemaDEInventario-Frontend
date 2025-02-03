import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedores } from '../models/proveedores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvedorserviceService  {
  private url:string='http://localhost:8080/api/proveedor'
    constructor(private http:HttpClient) { }

     findAll(): Observable<Proveedores[]>{
        return this.http.get<Proveedores[]>(this.url)
    }
    findById(id:number):Observable<Proveedores>{
      return this.http.get<Proveedores>(`${this.url}/${id}`)
    }

create(user:Proveedores): Observable<Proveedores>{
  return this.http.post<Proveedores>(this.url,user);
}
update(user:Proveedores): Observable<Proveedores>{
  return this.http.put<Proveedores>(`${this.url}/${user.id}`,user);
}

remove(id:number):Observable<void>{
  return this.http.delete<void>(`${this.url}/${id}`);
 
}
findBynombre(name:String):Observable<Proveedores[]>{
  return this.http.get<Proveedores[]>(`${this.url}/buscar/${name}`)


}


  
}
