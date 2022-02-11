import { Component,OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Musica } from '../tab3/interface/musica';
import { MusicaUserService } from './service/musica-user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{
  canciones: Musica[]=[];
  constructor(
    private musicauserService: MusicaUserService,
    private alertController: AlertController,
    private toastCtrl:ToastController
  ) {}

  ngOnInit(): void {
    this.getAllMusica(); 
  }
  getAllMusica(){
    this.musicauserService.getAllMusica()
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
    this.musicauserService.createMusic(cancion)
    .subscribe((data)=>{
      this.getAllMusica();
      this.presentToast("La canción fue agregada, sonará en breve");
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
