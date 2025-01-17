import { EventEmitter, Injectable } from '@angular/core';
import { Proveedores } from '../models/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedorSharingDatosService {

  constructor() { }

   private  _newProveedorEventEmitter: EventEmitter<Proveedores>= new EventEmitter();
   private _errorsUSerFormEvenEmitter = new EventEmitter();


    get newProveedorEventEmitter(): EventEmitter <Proveedores>{
       return this._newProveedorEventEmitter;
     }
     get errorsUSerFormEvenEmitter(){
      return this._errorsUSerFormEvenEmitter;
      
    }
  



}
