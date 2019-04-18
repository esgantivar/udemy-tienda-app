import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {CarritoProvider} from "../../providers";
import {OrdenesDetallePage} from "..";

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
  public detail = OrdenesDetallePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private carrito: CarritoProvider,
              private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create();
    this.carrito.load().then(() => {
      loading.dismissAll();
    })
  }

}
