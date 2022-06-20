import { Injectable } from '@angular/core';
//import  *  as  data  from  'src/assets/datos/platos.json';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Plato } from '../entidades/Plato';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  //platosFile:any  = (data  as  any).default;
  public platosData:Plato[]=[];
  public platoEncontrado:Plato;

  constructor(public http: HttpClient) {
    console.log("Servicio Cargado!!!");
   }

  public getPlatos():any[]{
    return this.platosData;
    console.log(this.platosData);
  }

  public getPlatoXId(idx:number):any{
      for(let plato of this.platosData){
          if(plato.id == idx){
            return plato;
          }
      }
  }


  //lee todos los platos
  getPlatosFromDataBase(){
    return this.http.get("http://localhost:8084/api/platos").pipe(
      map( platosData => platosData));
  }

  //busca un plato por el id
  getPlatoEnBaseDatosXId(idx:string){
    return this.http.get("http://localhost:8084/api/platoxid/" + idx).pipe(
      map( platoEncontrado => platoEncontrado));
  }

  //busca los platos por un terminode busqueda
  getPlatosBusquedaFromDataBase(termino:string){
    return this.http.get("http://localhost:8084/api/buscar/" + termino).pipe(
      map( platosSearch => platosSearch));
  }
  
   async updatePlato( platoUpdate: Plato) {
    await this.guardarPOST(platoUpdate);
  }

    async deletePlatoFetch(idPlato: string){
      let urlServer = 'http://localhost:8084/api/delete/'+idPlato;
      console.log(urlServer);
      let result = await fetch(urlServer, {
          method: 'DELETE',
          headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin':'*'
          },
          mode: 'cors'
      });
    }

    async guardarPOST(plato:Plato) {
      let urlServer = 'http://localhost:8084/api/insert';
      let method = "POST";
      if(plato && plato.id > 0){
        urlServer = 'http://localhost:8084/api/update';
        method = "PUT";
      }
      console.log(plato.id + " " + method)
      await fetch(urlServer, {
        "method": method,
        "body": JSON.stringify(plato),
        "headers": {
        "Content-Type": 'application/json',
        'Access-Control-Allow-Origin':'*'
        }
      });

    }



}


