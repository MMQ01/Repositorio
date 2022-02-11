import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../interface/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private api="http://192.168.1.41:3000";

  constructor(
    private http:HttpClient 
    ) { }

    getAllMarca(){
      const path = `${this.api}/marca/`;
      return this.http.get<Marca[]>(path);
    }
    createMarca(marca : Marca){
      const path = `${this.api}/marca/`;
      return this.http.post<Marca>(path, marca);
    }
    updateMarca(marca : Marca){
      const path = `${this.api}/marca/${marca.idmarca}`;
      return this.http.put<Marca>(path, marca);
    }
    deleteMarca(idmarca : number ){
      const path = `${this.api}/marca/${idmarca}`;
      return this.http.delete<Marca>(path);
    }
  }
