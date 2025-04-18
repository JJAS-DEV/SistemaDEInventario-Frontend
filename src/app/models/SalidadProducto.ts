import { ProductoSalidad } from "./ProductoSalidad";

export class SalidadProducto {
    id!: number;
    fecha!: string;
    usuarioResponsable!: string;
    motivo!: string;
    observaciones!: string;
    productos!: ProductoSalidad[];
}