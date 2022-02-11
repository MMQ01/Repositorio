import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Proveedor } from './interface/proveedor';
import { ProveedorService } from './service/proveedor.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  proveedores: Proveedor[]=[];
  constructor(
    private proveedorService : ProveedorService,
    private alertController: AlertController,
    private toastCtrl:ToastController
    ) { }

  ngOnInit(): void {
   this.getAllProveedor();   
  }
  getAllProveedor(){
    this.proveedorService.getAllProveedor()
    .subscribe(todos =>{
      this.proveedores=todos
      console.log(todos);
    });
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Nuevo Proveedor',
      inputs:[{
        name: 'proveedorDescripcion',
        type: 'text',
        placeholder: 'Nombre del proveedor'
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
          this.createProveedor(data.proveedorDescripcion);
          console.log('Confirm Ok');
        }
      }

      ] 
    });
    await alert.present();
  }


   
  createProveedor(proveedorDescripcion: string) {
    const proveedor={
      idproveedor: null,
      proveedorDescripcion
    };
    this.proveedorService.createProveedor(proveedor)
    .subscribe((data)=>{
      this.getAllProveedor();
      this.presentToast("El proveedor fue Agregado");
    })  
  }


  async onupdateProveedor(idproveedor:number,index:number){
    const provedoractual = this.proveedores.find(x => x.idproveedor===idproveedor)
    const alert = await this.alertController.create({
      header: 'Actualizar Proveedor',
      inputs:[{
        name: 'proveedorDescripcion',
        type: 'text',
        placeholder: 'Nombre',
        value: provedoractual.proveedorDescripcion
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
          this.updateProveedor(idproveedor,data.proveedorDescripcion);
          console.log('Update Ok');
        }
      }
      ] 
    });
    await alert.present();
  }
  async updateProveedor(idproveedor: number, proveedorDescripcion: string) {
    const proveedor={
      idproveedor: idproveedor,
      proveedorDescripcion     

    };
    this.proveedorService.updateProveedor(proveedor)
    .subscribe((data)=>{
      console.log("entra");
      this.presentToast("El proveedor fue actualizado");
      this.getAllProveedor(); 
    })     
  }
  



  deleteProveedor(idproveedor: number, index: number){
    this.proveedorService.deleteProveedor(idproveedor)
    .subscribe(()=>{
      console.log(idproveedor);
      this.proveedores.splice(index,1);
      this.getAllProveedor();
      this.presentToast("El proveedor fue eliminado");
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
