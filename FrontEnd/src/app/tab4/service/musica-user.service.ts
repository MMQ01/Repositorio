import { Injectable } from '@angular/core';
import { Musica } from 'src/app/tab3/interface/musica';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicaUserService {

 
  private api="http://192.168.1.41:3000";

  constructor(
    private http:HttpClient 
    ) { }

    getAllMusica(){
      const path = `${this.api}/music/`;
      return this.http.get<Musica[]>(path);
    }
    deleteMusic(id : number ){
      const path = `${this.api}/music/${id}`;
      return this.http.delete<Musica>(path);
    }
    createMusic(musica : Musica){
      const path = `${this.api}/music/`;
      return this.http.post<Musica>(path, musica);
    }
}
