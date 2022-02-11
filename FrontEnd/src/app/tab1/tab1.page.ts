import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Marca } from './interface/marca';
import { MarcaService } from './Services/marca.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  marcas: Marca[]=[];
  constructor(
    private marcaService : MarcaService,
    private alertController: AlertController,
    private toastCtrl:ToastController
    ) { }

  ngOnInit(): void {
   this.getAllMarca();   
  }

  getAllMarca(){
    this.marcaService.getAllMarca()
    .subscribe(todos =>{
      this.marcas=todos
      console.log(todos);
    });
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Nueva Marca',
      inputs:[{
        name: 'marcaDescripcion',
        type: 'text',
        placeholder: 'Nombre de la Marca'
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
          this.createMarca(data.marcaDescripcion);
          console.log('Confirm Ok');
        }
      }

      ] 
    });
    await alert.present();
  }

  
  createMarca(marcaDescripcion: string) {
    const marca={
      idmarca: null,
      marcaDescripcion
    };
    this.marcaService.createMarca(marca)
    .subscribe((data)=>{
      this.getAllMarca();
      this.presentToast("La marca fue Agregada");
    })  
  }
  /*
 async updateMarca(index) {
    const alert = await this.alertController.create({
      header: 'Actualizar Marca',
      inputs:[{
        name: 'marcaDescripcion',
        type: 'text',
        placeholder: 'Nombre de la Marca'
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
        text: 'Actualizado',
        handler: (data) => {
          this.marcas[index]=data.marcaDescripcion;
          this.updateMarca(data.marcaDescripcion);
          console.log('Confirm Ok');
        }
      }

      ] 
    });
    await alert.present();
   
  }
*/

async onUpdateMarca(idmarca:number,index:number){
  const marcaactual = this.marcas.find(x => x.idmarca=== idmarca)
  const alert = await this.alertController.create({
    header: 'Actualizar Marca',
      inputs:[{
        name: 'marcaDescripcion',
        type: 'text',
        placeholder: 'Nombre de la Marca'
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
      text: 'Actualizar',
      handler: (data) => {
        this.updateMarca(idmarca, data.marcaDescripcion);
        console.log('Update Ok');
      }
    }
    ] 
  });
  await alert.present();
}

async updateMarca(idmarca: number, marcaDescripcion: string,) {
  const marca={
    idmarca: idmarca,
    marcaDescripcion
  };
  this.marcaService.updateMarca(marca)
  .subscribe((data)=>{
    console.log("entra");
    this.presentToast("El proveedor fue actualizado");
    this.getAllMarca(); 
  })     
}
  deleteMarca(idmarca: number, index: number){
    this.marcaService.deleteMarca(idmarca)
    .subscribe(()=>{
      this.marcas.splice(index,1);
      this.getAllMarca();
      this.presentToast("La marca fue eliminada");
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
