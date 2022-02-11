import { Component, OnInit } from '@angular/core';
import { Musica } from 'src/app/tab3/interface/musica';
import { HttpClient } from '@angular/common/http';
import { MusicaUserService } from '../tab4/service/musica-user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  canciones: Musica[]=[];

  constructor(
    private musicauserService: MusicaUserService,
    private alertController: AlertController
  ) {}
  ngOnInit(): void {
    this.getAllMusica();
  }
   getAllMusica(){
    this.musicauserService.getAllMusica()
    .subscribe(todos =>{
      console.log("entra async")
      this.canciones=todos
      console.log(todos);
    });
  }
  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Nuevo Proveedor',
      inputs:[{
        name: 'nombreCancion',
        type: 'text',
        placeholder: 'Nombre y Autor de la Canción'
      },
      {
        name: 'Usuario',
        type: 'text',
        placeholder: 'Usuario o Mesa'
      }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Crear',
        handler: (data) => {
          this.getAllMusica();
          console.log('Confirm Ok');
        }
      }

      ] 
    });
    await alert.present();
  }
}
