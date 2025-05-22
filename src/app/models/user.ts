import { Role } from "./Role";

export class User{
    id!:number;
    name:string="";
    lastname!:string;
    email!:string;
    username!:string;
    password!:string;
    roles: Role[];

    
    constructor() {
       
        this.roles = []; // Inicializamos productos como un array vacío
      }

    
}

 