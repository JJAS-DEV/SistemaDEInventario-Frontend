import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducFormserviceService } from '../../produc-form/produc-formservice.service';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../models/producto';
import Swal from 'sweetalert2';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detallesproductos',
  standalone: true,
  imports: [CommonModule,QRCodeModule],
  templateUrl: './detallesproductos.component.html',
  styleUrl: './detallesproductos.component.css'
})
export class DetallesproductosComponent implements OnInit {
   producto!:Producto;
   mensajeError!:any;
     public qrCodeDownloadLink: SafeUrl = ''; 
   
   public myAngularxQrCode: any ;


  constructor(      private route: ActivatedRoute,
        private service:ProducFormserviceService,   
           private productoService: ProductoService,
               private router: Router
           
        
  ){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const codigo = params.get('id');
      
      this.productoService.buscarProductosByCodigo(codigo!).subscribe({
        next: (producto) => {
          this.producto = producto;
          this.myAngularxQrCode=this.myAngularxQrCode = JSON.stringify({
            nombre: this.producto.nombre,
            precio: this.producto.precio,
            codigo: this.producto.codigo_producto,
          }); // o el objeto que quieras

        },
        error: (err) => {
       Swal.fire({
                title: "error",
                text: err.error.error,
                icon: "error"
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/productos'])                }
              });
        }
      });    
    })  }

    onChangeURL(url: SafeUrl) {
      this.qrCodeDownloadLink = url;  // Asignar SafeUrl
    }
  



}
