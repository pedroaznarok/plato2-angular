import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plato } from 'src/app/entidades/Plato';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-plato',
  templateUrl: './item-plato.component.html',
  styleUrls: ['./item-plato.component.css']
})
export class ItemPlatoComponent implements OnInit {

  @Input() platoAux:Plato;
  @Input() index:number;

  //entre <> tiene que asignarse el tipo de dato a emitir
  //puede ser un object, string, number, etc
  @Output() platoSeleccionado:EventEmitter<number>;//number es el index

  
  constructor(private router:Router) { 
    this.platoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public verPlato(){
    console.log(this.index);
    //this.router.navigate(['/detallePlato', this.index])
    this.platoSeleccionado.emit(this.index);
  }
  

}
