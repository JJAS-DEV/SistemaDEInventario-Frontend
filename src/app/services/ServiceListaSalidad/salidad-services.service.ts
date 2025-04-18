import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalidadProducto } from '../../models/SalidadProducto';

@Injectable({
  providedIn: 'root'
})
export class SalidadServicesService {
    private url: string = 'http://localhost:8080/api/salidadProducto'
  
    constructor(private http: HttpClient, ) { }


    
  findAll(): Observable<SalidadProducto[]> {
      return this.http.get<SalidadProducto[]>(this.url)
    }

}
