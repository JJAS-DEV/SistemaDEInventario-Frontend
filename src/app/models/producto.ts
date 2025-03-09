import { Proveedores } from "./proveedores";

export class Producto {
    id!:number;
    nombre!:string;
    precio!:number;
    codigo_producto!:string;
    stock!:number ;
    proveedor:Proveedores=new Proveedores();
    

}