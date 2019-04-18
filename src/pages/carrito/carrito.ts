import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {CarritoProvider} from "../../providers";

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public carrito: CarritoProvider,
              private loading: LoadingController,
              private alertCtrl: AlertController) {
  }

  public createOrder(): void {
    const loading = this.loading.create();
    loading.present();
    this.carrito.createOrder().subscribe(() => {
      loading.dismissAll();
      this.alertCtrl.create({
        title: 'Orden realizada!',
        message: 'Nos contactaremos con usted próximamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.carrito.clear();
            this.viewCtrl.dismiss();
          }
        }]
      }).present();
    }, () => {
      loading.dismissAll();
    });
  }

}
