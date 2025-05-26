import { Component, OnInit } from '@angular/core';
import { EntradaProductos } from '../../../../../models/productoEntrada';
import { EntradaProductoService } from '../../../../../services/entrada-producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoProductoEntrada } from '../../../../../models/ProductoProductoEntrada';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../../../models/producto';
import { Observable, of } from 'rxjs';
import { ProductoService } from '../../../../../services/producto.service';
import Swal from 'sweetalert2';
import { entradaRequest } from '../../../../../models/entradaRequest';
import { AuthService } from '../../../../../services/auth.service';
import { PdfService } from '../../creacionpdf/creacionDepdf/pdf.service';

@Component({
  selector: 'app-detalle-entrada',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './detalle-entrada.component.html',
  styleUrl: './detalle-entrada.component.css'
})
export class DetalleEntradaComponent implements OnInit {
  entrada: EntradaProductos;
  service: EntradaProductoService;
  producto: ProductoProductoEntrada[] = [];
  modificar: boolean = false;
  eliminarEntradad:boolean=true;

  listaNumerosDiferentes: { id: number, cantidad: number }[] = [];
    



  constructor(service: EntradaProductoService, private route: ActivatedRoute,
    private productoservice:ProductoService,
           private router: Router,
               private serviceuth:AuthService,
               private sdfService:PdfService
           
    
  ) {
    this.entrada = new EntradaProductos;
    this.service = service;
       this.responsable=serviceuth.getUsername();

    

  }

  responsable!:string;




  idPagina!:number;

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.idPagina=id;
        this.service.findById(id).subscribe(entrada => {
          this.entrada = entrada;  // Se asegura de tener los datos
          this.producto = this.entrada.productos;  // Asignar productos
    
          // Verificar si `productos` tiene datos
          if (this.producto && this.producto.length > 0) {
            // Llenar listaNumerosDiferentes con los datos de los productos
            this.listaNumerosDiferentes = this.producto.map(producto => ({
              id: producto.producto.id,
              cantidad: producto.cantidad
            }));
          this.sepuedeEliminar(this.entrada);
    
            console.log("Lista de productos:", this.listaNumerosDiferentes); 
            // Verifica la lista
          } else {
            console.warn('⚠ No hay productos disponibles.');
            this.listaNumerosDiferentes = [];  // Lista vacía si no hay productos
          }
        });

        
       
      }


    })
   

    
   
  }
sepuedeEliminar(productos:EntradaProductos){
  productos.productos.forEach(productos=>{
    if(productos.cantidad>productos.producto.stock){
      this.eliminarEntradad=false;
      
    }
  })



}
 
  Ifmodificar() {
    if(this.modificar){
    this.modificar = false;
    }else{
      this.modificar = true;

    }

         
  }

  buscarProducto(idBuscado: number)  {
  return this.listaNumerosDiferentes.find(producto => producto.id === idBuscado)?.cantidad;


  }

  productosmodficados:Producto[]=[];
  modificadoEntrada: entradaRequest= new entradaRequest;
productod!:Producto;
   EnviarListaModificado(productosModificdos: ProductoProductoEntrada[]) {
let verificador=true;
   productosModificdos.forEach(pr=>{
      if (!pr.cantidad ||pr.cantidad.toString().trim() === "") {
        verificador=false// Detener la ejecución si está vacío
      }
  
      // Convertir cantidad a número
      const cantidad = Number(pr.cantidad);
  
      // Validar que la cantidad no sea negativa, cero o NaN
      if ( cantidad < 0) {
        verificador=false // Detener la ejecución si el número es inválido
      }
    })


  if(productosModificdos.length===0){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
         if(verificador){
     productosModificdos.forEach(pr=>{
      pr.producto.stock=pr.cantidad;
      this.productosmodficados.push(pr.producto)
      this.modificadoEntrada.productos.push(pr.producto)
      this.modificadoEntrada.observacion=this.responsable;

     })
      this.service.update(this.modificadoEntrada, this.idPagina).subscribe({
        next: (response) => {
          console.log("✅ Actualización exitosa:", response);
          alert("Productos actualizados correctamente.");
        },
        error: ( err) => {

           if (err.status == 200){
            Swal.fire({
              title: "elimnado",
              text:  " se elimino la entrada ",
              icon: "success"
              
            }).then((result) => {
              // Espera a que el usuario haga clic en "Ok" y luego recarga la página
              if (result.isConfirmed) {
                this.router.navigate(['/ListaDeEntradas'])              
                        }
          })  ;







           }else{
            console.error("❌ Error al actualizar: ", err);
            alert("Error al actualizar los productos. Revisa la consola.");

           }
         

        
        },
        complete:() =>{
          Swal.fire({
                            title: "guardado",
                            text:  " modificado con exito ",
                            icon: "success"
                            
                          }).then((result) => {
                            // Espera a que el usuario haga clic en "Ok" y luego recarga la página
                            if (result.isConfirmed) {
                              this.router.navigate(['/ListaDeEntradas'])              
                                      }
                        })  ;



          
            
        }
      });


    }
    
    
    else{
       Swal.fire(
                          'Error en la modificacion',
                          'error'
                        );



    }
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info").then((result) => {
          // Espera a que el usuario haga clic en "Ok" y luego recarga la página
          if (result.isConfirmed) {
            window.location.reload();
                        
                    }
      }) ;


      
      }
    });
  }


    else if(verificador){



      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          productosModificdos.forEach(pr=>{
            pr.producto.stock=pr.cantidad;
            this.productosmodficados.push(pr.producto)
            this.modificadoEntrada.productos.push(pr.producto)
            this.modificadoEntrada.observacion=this.responsable;

           }) 
            this.service.update(this.modificadoEntrada, this.idPagina).subscribe({
              next: (response) => {
               
              },
              error: ( err) => {
      
                 if (err.status == 200){
                  Swal.fire({
                    title: "elimnado",
                    text:  " se elimino la entrada ",
                    icon: "success"
                    
                  }).then((result) => {
                    // Espera a que el usuario haga clic en "Ok" y luego recarga la página
                    if (result.isConfirmed) {
                      this.router.navigate(['/ListaDeEntradas'])              
                              }
                })  ;
                 }else{
                  console.error("❌ Error al actualizar: ", err);
                  alert("Error al actualizar los productos. Revisa la consola.");
      
      
      
                 }
               
      
              
              },
              complete:() =>{
                Swal.fire({
                                  title: "guardado",
                                  text:  " modificado con exito ",
                                  icon: "success"
                                  
                                }).then((result) => {
                                  // Espera a que el usuario haga clic en "Ok" y luego recarga la página
                                  if (result.isConfirmed) {
                                    this.router.navigate(['/ListaDeEntradas'])              
                                            }
                              })  ;
      
      
      
                
                  
              }
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info").then((result) => {
            // Espera a que el usuario haga clic en "Ok" y luego recarga la página
            if (result.isConfirmed) {
              window.location.reload();
                          
                      }
        }) ;
          
          
        }
      });
   


    }else{
       Swal.fire(
                          'Error en la modificacion',
                          'error'
                        );



    }
    
  
  }





  eliminar(id:number){

    this.entrada.productos = this.entrada.productos.filter(producto => producto.producto.id !== id);
    console.log( this.entrada.productos)


  }






  enviarActualizacion() {
      console.log(this.idPagina);
      console.log(this.productosmodficados)

      this.service.update(this.modificadoEntrada, this.idPagina).subscribe({
        next: (response) => {
          console.log("✅ Actualización exitosa:", response);
          alert("Productos actualizados correctamente.");
        },
        error: (error) => {
          console.error("❌ Error al actualizar:", error);
          alert("Error al actualizar los productos. Revisa la consola.");
        }
      });
  }

  EliminarEntrada(){

    Swal.fire({
      title: "quieres eliminar la entradad?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "eliminar entradad ",
      denyButtonText: `no eliminar la entrada'`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("eliminado! con exito"+ this.idPagina, "", "success");
        this.service.remove(this.idPagina).subscribe({
          next: (respuesta) => {
            console.log('Eliminación exitosa. Respuesta:', respuesta);
            // Aquí puedes agregar la lógica que necesites después de una eliminación exitosa
          },
          error: (error) => {
            console.error('Error al eliminar:', error);

            this.router.navigate(['/ListaDeEntradas'])              

            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
          }
        });


      } else if (result.isDenied) {
        Swal.fire("los cambios no se realizaron", "", "info");
        window.location.reload();

      }
    });
   

  }


  generatePDF(){
    this.sdfService.generatePDF( this.entrada.productos,"Reporte de Entrada",this.entrada,0);

  }
}
