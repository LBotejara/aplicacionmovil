import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-listado-proveedores',
  templateUrl: 'listado-proveedores.html',
})
export class ListadoProveedoresPage {

  proveedores:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public modal: ModalController) {
  }

  ionViewDidLoad() {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.http.get('http://localhost:3000/proveedor')
    .map((resp:any)=>{
      return resp
    })
    .subscribe((resp:any)=>{
      this.proveedores = resp.proveedores
    },(error)=>{
      console.log(error);
    })  
  }

  crearProveedor(){
    let modal = this.modal.create('CrearProveedorPage')

    // modal.onDidDismiss(proveedor=>{
    //   if(proveedor){
    //     this.proveedores.push(proveedor);
    //   }
    // })


    modal.onDidDismiss(()=>{
      this.cargarProveedores();
    })

    modal.present();
  }

  verProveedor(proveedor){
    this.navCtrl.push('VerProveedorPage',{proveedor: proveedor})
  }

  editarProveedor(proveedor){
    this.navCtrl.push('EditarProveedorPage',{proveedor: proveedor})
  }

  eliminarProveedor(id){
    this.http.delete('http://localhost:3000/proveedor/' + id)
                .subscribe((resp:any)=>{
                  this.cargarProveedores();
                },(error)=>{
                  console.log(error)
                })
  }

}
