import { Role } from "./Role";

export class User{
    id!:number;
    name:string="";
    lastname!:string;
    email!:string;
    username!:string;
    password!:string;
    role: Role[];

    
    constructor() {
       
        this.role = []; // Inicializamos productos como un array vacío
      }

    
}

 