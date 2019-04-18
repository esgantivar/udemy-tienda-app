import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CarritoProvider} from "../../providers";

/**
 * Generated class for the ProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  public producto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private carrito: CarritoProvider) {
    this.producto = this.navParams.get('product');
  }

  public addToCar(): void {
    this.carrito.addItem(this.producto);
  }

}
