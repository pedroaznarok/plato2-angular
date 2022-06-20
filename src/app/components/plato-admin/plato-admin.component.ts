import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/servicios/delivery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plato } from 'src/app/entidades/Plato';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-plato-admin',
  templateUrl: './plato-admin.component.html',
  styleUrls: ['./plato-admin.component.css']
})
export class PlatoAdminComponent implements OnInit {


  plato:Plato = {
    id:0,
    nombre:"",
    precio:0,
    rubro:"",
    imagenPath:"",
    ingredientes:[],
    urlImagenPath:""
  };
  new = false;
  idplato: string;
  resultadoOperacion = "";

  constructor(private servicioDelivery:DeliveryService, private router:Router, private activeRoute:ActivatedRoute) {
    this.activeRoute.params
    .subscribe(
      parametros => {
        this.idplato = parametros['id'];
        if(this.idplato != "nuevo"){
          servicioDelivery.getPlatoEnBaseDatosXId(this.idplato)
          .subscribe(platoEncontrado => this.plato = platoEncontrado as Plato);
        }else{
          console.log("ES NUEVO");
        }
      }
    );

  }

  ngOnInit() {

  }

  save() {
    console.log("toy")
    if(!this.validarSiNumero(String(this.plato.id))){
      console.log(this.plato.id)
      this.resultadoOperacion = ("Ingrese un numero para el precio.");
      return;
    }
    if (this.idplato === 'nuevo') {
      console.log('nuevo');
      this.guardarPOST();
    } else {
      console.log(`Update ${ this.idplato }`);
      this.guardarPOST()
    }
  }


  addNew(formu: NgForm) {
    this.router.navigate(['/admin', 'nuevo']);
    formu.reset({
      id:"0",
      nombre:"",
      precio:"",
      rubro:"",
      imagenPath:""
    });
  }

  validarSiNumero(numero:string):boolean{
    if(!/^([0-9])*$/.test(numero))
        return false;
    return true;

  }

  async guardarPOST() {
    if(this.plato){
    await this.servicioDelivery.guardarPOST(this.plato);
    this.resultadoOperacion = "Operación finalizada, verifique los datos";
    this.router.navigate(['/lista']);
  }
  }
}
