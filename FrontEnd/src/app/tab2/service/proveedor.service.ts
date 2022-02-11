import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../interface/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private api="http://192.168.1.41:3000";

  constructor(
    private http:HttpClient 
    ) { }

    getAllProveedor(){
      const path = `${this.api}/proveedor/`;
      return this.http.get<Proveedor[]>(path);
    }
    createProveedor(proveedor : Proveedor){
      const path = `${this.api}/proveedor/`;
      return this.http.post<Proveedor>(path, proveedor);
    }
    updateProveedor(proveedor : Proveedor){
      const path = `${this.api}/proveedor/${proveedor.idproveedor}`;
      return this.http.put<Proveedor>(path, proveedor);
    }
    deleteProveedor(idproveedor : number ){
      const path = `${this.api}/proveedor/${idproveedor}`;
      return this.http.delete<Proveedor>(path);
    }
}
