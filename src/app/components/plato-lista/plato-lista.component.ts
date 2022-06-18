import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plato } from 'src/app/entidades/Plato';
import { DeliveryService } from 'src/app/servicios/delivery.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-plato-lista',
  templateUrl: './plato-lista.component.html',
  styleUrls: ['./plato-lista.component.css']
})
export class PlatoListaComponent implements OnInit {

  platos:Plato[] = [];
  loading = true;

  constructor(private servicioDelivery:DeliveryService, private router:Router, private modalService: NgbModal) {

  }

  ngOnInit() {

    this.servicioDelivery.getPlatosFromDataBase()
    .subscribe(data => {
      console.log(data);
      for(let plato in data){
        console.log(data[plato]);
        this.platos.push(data[plato]);
      }
      this.loading = false;
    });
  }

  delete(idPlato:string){
    var opcion = confirm("Esta seguro que desea eliminar el plato?");
    if (opcion == true) {
      this.servicioDelivery.deletePlatoFetch(idPlato);
      location.reload();
    }

  }

}
