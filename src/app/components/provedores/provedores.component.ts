import { Component, OnInit } from '@angular/core';
import { Proveedores } from '../../models/proveedores';
import { ProvedorserviceService } from '../../services/provedorservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-provedores',
  standalone: true,
  imports: [],
  templateUrl: './provedores.component.html',
})
export class ProvedoresComponent implements OnInit {
   proveedores: Proveedores[] = [];

   constructor(private service:ProvedorserviceService,
     private router: Router,
        private route : ActivatedRoute
   ){
   }
  ngOnInit(): void {
      this.service.findAll().subscribe(proveedores => this.proveedores = proveedores);


  }

  



}
