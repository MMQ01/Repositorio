import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private api="http://192.168.1.41:3000";

  constructor(
    private http:HttpClient 
    ) { }

    getAllProducto(){
      const path = `${this.api}/producto/`;
      return this.http.get<Producto[]>(path);
    }
    createProducto(producto : Producto){
      const path = `${this.api}/producto/`;
      return this.http.post<Producto>(path, producto);
    }
    updateProducto(producto : Producto){
      const path = `${this.api}/producto/${producto.idProducto}`;
      return this.http.put<Producto>(path, producto);
    }
    deleteProducto(idProducto : number ){
      const path = `${this.api}/producto/${idProducto}`;
      return this.http.delete<Producto>(path);
    }
}
