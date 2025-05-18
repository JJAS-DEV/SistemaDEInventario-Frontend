import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeComponent,LOAD_WASM } from 'ngx-scanner-qrcode';


@Component({
  selector: 'app-prueba-scaner',
  standalone: true,
  imports: [CommonModule, QRCodeModule,NgxScannerQrcodeComponent,ReactiveFormsModule],
  templateUrl: './prueba-scaner.component.html',
  styleUrl: './prueba-scaner.component.css'
})

export class PruebaScanerComponent implements  AfterViewInit  {
  public myAngularxQrCode: string = '';
  public qrCodeDownloadLink: SafeUrl = ''; 
  resultado!:any;

  @ViewChild('action', { static: false }) action!: NgxScannerQrcodeComponent;
  scannedData: string | null = null;

  // Mantener SafeUrl para seguridad

  constructor(private sanitizer: DomSanitizer) {
    this.myAngularxQrCode = 'jonathan'; 
        LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

    // Datos para el QR
  }
  ngAfterViewInit(): void {
    this.action.data.subscribe((data: any) => {
      try {
      const contenido = JSON.parse(data[0].value); // convierte el string a objeto
      this.scannedData = contenido.nombre; // extrae solo el nombre
      console.log('Nombre escaneado:', this.scannedData);
    } catch (e) {
      console.error('QR inválido o no contiene un objeto JSON válido:', e);
      this.scannedData = 'QR no válido';
    }
    });
  }

  // Recibe el SafeUrl generado por el componente QR
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;  // Asignar SafeUrl
  }
  



}

// File: app.component.html
  


