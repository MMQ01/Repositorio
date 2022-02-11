import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Musica } from './interface/musica';
import { MusicaService } from './service/musica.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  canciones: Musica[]=[];
  constructor(
    private musicaService : MusicaService,
    private alertController: AlertController,
    private toastCtrl:ToastController
  ) {}


  ngOnInit(): void {
    this.getAllMusica(); 
  }
  getAllMusica(){
    this.musicaService.getAllMusica()
    .subscribe(todos =>{
      this.canciones=todos
      console.log(todos);
    });
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Nueva Canción',
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
          this.createMusic(data.nombreCancion,data.Usuario);
          console.log('Confirm Ok');
        }
      }

      ] 
    });
    await alert.present();
  }

  createMusic(nombreCancion: string, Usuario: string) {
    const cancion={
      id: null,
      nombreCancion,Usuario,urlCancion: ''
    };
    this.musicaService.createMusic(cancion)
    .subscribe((data)=>{
      this.getAllMusica();
      this.presentToast("La canción fue agregada, sonará en breve");
    })  
  }

  deleteMusic(id: number, index: number){
    this.musicaService.deleteMusic(id)
    .subscribe(()=>{
      this.canciones.splice(index,1);
      this.getAllMusica();
      this.presentToast("Canción fue eliminada");
    })
  }
  
  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

}
