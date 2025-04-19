import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { SalidadProducto } from '../../../../../models/SalidadProducto';
import { SalidadServicesService } from '../../../../../services/ServiceListaSalidad/salidad-services.service';
import { ServicespaginadoService } from '../../../entrada-productos/services/servicespaginado.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es'; 
import { registerLocaleData } from '@angular/common';
// Importar el locale para español

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-detalles-salidas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './detalles-salidas.component.html',
  providers: [DatePipe,  { provide: LOCALE_ID, useValue: 'es' }]

})
export class DetallesSalidasComponent  implements OnInit {

  salidadProducto!:SalidadProducto;

  constructor(private route: ActivatedRoute,private salidadServicesService:SalidadServicesService,private datePipe: DatePipe){

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.salidadServicesService.findById(id).subscribe(salidadProducto => this.salidadProducto=salidadProducto)

      }
    

    


    }

  )

}
  


}
