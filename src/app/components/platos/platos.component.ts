import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/servicios/delivery.service';
import { Router } from '@angular/router';
import { Plato } from 'src/app/entidades/Plato';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {

  platosArr :Plato[]=[];
  loading = true;

  constructor(private servicioDelivery:DeliveryService, private router:Router) {

  }

  ngOnInit(): void {
    this.servicioDelivery.getPlatosFromDataBase()
    .subscribe(dataPlatos => {
      for(let plato in dataPlatos){
        console.log(dataPlatos[plato]);
        this.platosArr.push(dataPlatos[plato]);
      }
      this.loading = false;
    });
  }

  public verPlato(idx:string){
    console.log("ID PLATO " + idx);
    this.router.navigate(['/detallePlato', idx])
  }


}
