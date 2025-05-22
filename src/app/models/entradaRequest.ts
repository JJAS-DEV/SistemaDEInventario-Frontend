import { Producto } from "./producto";

export class entradaRequest {
  productos: Producto[];
  observacion!:String;
    

  constructor(){
    this.productos=[]
  }
}