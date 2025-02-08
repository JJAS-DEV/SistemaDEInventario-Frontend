import { Component, OnInit } from '@angular/core';
import { Proveedores } from '../../../models/proveedores';
import { ProveedorSharingDatosService } from '../../../services/proveedor-sharing-datos.service';
import { ActivatedRoute } from '@angular/router';
import { ProvedorserviceService } from '../../../services/provedorservice.service';
import { NgForm ,FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formProveedor.component.html',
})
export class FormProvedor implements OnInit {
  proveedor: Proveedores;
  
  errors:any={};
constructor(
    private provedorservice: ProvedorserviceService,
    private route: ActivatedRoute,
    private sharingData: ProveedorSharingDatosService,
    private service:FormService
  ) { 
    this.proveedor = new Proveedores();



  }
  ngOnInit(): void {

    this.sharingData.errorsUSerFormEvenEmitter.subscribe(errors=> this.errors= errors);
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.provedorservice.findById(id).subscribe(proveedor => this.proveedor=proveedor);

      }

    
    }
  )
  }

  onSubmit(provedorForm: NgForm): void {
  
              
        console.log(this.proveedor);
        this.service.addUser(this.proveedor);
      // }
  
      // userForm.reset();
      // userForm.resetForm();
  
    }

onClear(provedorForm: NgForm): void {
    this.proveedor = new Proveedores();
    provedorForm.reset();
    provedorForm.resetForm();
    

  }

  


  


}