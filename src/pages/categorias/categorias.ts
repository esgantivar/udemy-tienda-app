import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProductosProvider} from "../../providers";
import {PorCategoriasPage} from "..";

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  public detail = PorCategoriasPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public products: ProductosProvider) {
  }

}
