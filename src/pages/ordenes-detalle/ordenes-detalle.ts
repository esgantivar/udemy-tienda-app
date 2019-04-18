import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {CarritoProvider} from "../../providers";

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  public orden: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private carrito: CarritoProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.orden = this.navParams.get('orden');
  }

  public delete(): void {
    const loading = this.loadingCtrl.create();
    loading.present();
    this.carrito.deleteOrder(this.orden).subscribe(() => {
      loading.dismissAll();
      this.navCtrl.pop();
    }, () => {
      loading.dismissAll();
      this.alertCtrl.create({
        message: 'Se ha presentado un error, vuelva a intentarlo',
        buttons: ['OK']
      }).present();
    })
  }
}
