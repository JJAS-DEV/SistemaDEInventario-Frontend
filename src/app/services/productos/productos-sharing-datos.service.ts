import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosSharingDatosService {

  constructor() { }

     private _errorsUSerFormEvenEmitter = new EventEmitter();

     get errorsUSerFormEvenEmitter(){
      return this._errorsUSerFormEvenEmitter;
      
    }

    
  
  
}
