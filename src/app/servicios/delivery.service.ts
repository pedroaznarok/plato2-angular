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

  platoAdminUrl:string = "http://localhost:8084/RestoServlet";
  newPlato( platoNuevo: Plato) {
    console.log(this.platoAdminUrl);
    return this.http.post<Plato>( this.platoAdminUrl, null, {params: new HttpParams().set("action", "insertar").set("id", "0")
    .set("nombre", platoNuevo.nombre).set("imagenPath", platoNuevo.imagenPath).set("precio", String(platoNuevo.precio)).set("rubro", platoNuevo.rubro)
    }).pipe(map( nuevoPlato => {
            console.log(nuevoPlato.nombre);
            return nuevoPlato;
          }));
  }



   updatePlato( platoUpdate: Plato) {
      console.log(this.platoAdminUrl);
      return this.http.post<Plato>( this.platoAdminUrl, null, {params: new HttpParams().set("action", "actualizar").set("id", String(platoUpdate.id))
      .set("nombre", platoUpdate.nombre).set("imagenPath", platoUpdate.imagenPath).set("precio", String(platoUpdate.precio)).set("rubro", platoUpdate.rubro)
      }).pipe(map( res => {
              console.log(res.nombre);
              return res;
            }));
    }

    deletePlato(idPlato: string){
      console.log(this.platoAdminUrl);
      return this.http.post( this.platoAdminUrl, null, {params: new HttpParams().set("action", "eliminar").set("id", idPlato)})
            .pipe(
            map( res => {
              console.log(res);
              return res;
            }));
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
      await fetch(urlServer, {
        "method": method,
        "body": JSON.stringify(plato),
        "headers": {
        "Content-Type": 'application/json'
        }
      });

    }



}


