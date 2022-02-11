import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Producto } from './interface/producto';
import { ProductoService } from './service/producto.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit{
  productos: Producto[]=[];

  constructor(

    private productoService : ProductoService,
    private alertController: AlertController,
    private toastCtrl:ToastController
  ) {}


  ngOnInit(): void {
    this.getAllProducto();   
   }

   getAllProducto(){
    this.productoService.getAllProducto()
    .subscribe(todos =>{
      this.productos=todos
      console.log(todos);
    });
  }

  deleteProducto(idProducto: number, index: number){
    
    this.productoService.deleteProducto(idProducto)
    .subscribe(()=>{
      console.log(idProducto);
      this.productos.splice(index,1);
      this.getAllProducto();
      this.presentToast("El Producto fue eliminado");
    
    })
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Nuevo Producto',
      inputs:[{
        name: 'ProductoNombre',
        type: 'text',
        placeholder: 'Nombre del Producto'
      },
      {
        name: 'ProductoDescripcion',
        type: 'text',
        placeholder: 'Descripción del Producto'
      },
      {
        name: 'ProductoStock',
        type: 'number',
        placeholder: 'Stock del Producto'
      },
      {
        name: 'ProductoPrecioUnitario',
        type: 'number',
        placeholder: 'Precio Unitario'
      },
      {
        name: 'ProductoMarca',
        type: 'number',
        placeholder: 'Código Marca'
      },
      {
        name: 'ProductoProveedor',
        type: 'number',
        placeholder: 'Código Proveedor'
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
         this.createProducto(data.ProductoNombre,data.ProductoDescripcion,data.ProductoStock,data.ProductoPrecioUnitario,data.ProductoMarca,data.ProductoProveedor);
          console.log('Confirm Ok');
        }
      }

      ] 
    });
    await alert.present();
  }

  createProducto(ProductoNombre: string, ProductoDescripcion:string, ProductoStock:number, ProductoPrecioUnitario:number, ProductoMarca:number, ProductoProveedor:number) {
    const producto={
      idProducto: null,
      ProductoNombre,ProductoDescripcion,ProductoStock,ProductoPrecioUnitario,ProductoMarca,ProductoProveedor
    };
    this.productoService.createProducto(producto)
    .subscribe((data)=>{
      this.getAllProducto();
      this.presentToast("El producto fue Agregado");
    })  
  }



  
  async onupdateProducto(idProducto:number,index:number){
    const productoactual = this.productos.find(x => x.idProducto===idProducto)
    const alert = await this.alertController.create({
      header: 'Actualizar Producto',
      inputs:[{
        name: 'ProductoNombre',
        type: 'text',
        placeholder: 'Nombre',
        value: productoactual.ProductoNombre
      },
      {
        name: 'ProductoDescripcion',
        type: 'text',
        placeholder: 'Nombre',
        value: productoactual.ProductoDescripcion
      },
      {
        name: 'ProductoStock',
        type: 'number',
        placeholder: 'Nombre',
        value: productoactual.ProductoStock
      },
      {
        name: 'ProductoPrecioUnitario',
        type: 'number',
        placeholder: 'Nombre',
        value: productoactual.ProductoPrecioUnitario
      },
      {
        name: 'ProductoMarca',

        
        value: productoactual.ProductoMarca
      },
      {
        name: 'ProductoProveedor',
        
       
        value: productoactual.ProductoProveedor
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
          this.updateProducto(idProducto,data.ProductoNombre,data.ProductoDescripcion,data.ProductoStock,data.ProductoPrecioUnitario,data.ProductoProveedor,data.ProductoMarca);
          console.log('Update Ok');
        }
      }
      ] 
    });
    await alert.present();
  }
  async updateProducto(idProducto: number, ProductoNombre: string,ProductoDescripcion:string,ProductoStock:number,ProductoPrecioUnitario:number,ProductoMarca:number,ProductoProveedor:number) {
    const producto={
      idProducto: idProducto,
      ProductoNombre,ProductoDescripcion,ProductoStock,ProductoPrecioUnitario,ProductoMarca,ProductoProveedor

    };
    this.productoService.updateProducto(producto)
    .subscribe((data)=>{
      console.log("entra");
      this.presentToast("El producto fue actualizado");
      this.getAllProducto(); 
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
