import { ProductoProductoEntrada } from "./ProductoProductoEntrada";
import { Proveedores } from "./proveedores";

export class EntradaProductos {
    id!: number;
    proveedor!: Proveedores;
    productos!: ProductoProductoEntrada[];
    fecha!: string;
    responsable!:string;
    totalEngeneral!:number;
    totalPorProducto!:number;





}