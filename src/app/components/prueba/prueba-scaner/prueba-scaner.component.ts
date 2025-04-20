import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';


@Component({
  selector: 'app-prueba-scaner',
  standalone: true,
  imports: [ QRCodeModule],
  templateUrl: './prueba-scaner.component.html',
  styleUrl: './prueba-scaner.component.css'
})
export class PruebaScanerComponent {
  public myAngularxQrCode: string = '';
  public qrCodeDownloadLink: SafeUrl = '';  // Mantener SafeUrl para seguridad

  constructor(private sanitizer: DomSanitizer) {
    this.myAngularxQrCode = 'Your QR code data string';  // Datos para el QR
  }

  // Recibe el SafeUrl generado por el componente QR
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;  // Asignar SafeUrl
  }


  
}

// File: app.component.html
  


