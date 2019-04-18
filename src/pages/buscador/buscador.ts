import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProductosProvider} from "../../providers";
import {ProductoPage} from "..";

@Component({
  selector: 'page-buscador',
  templateUrl: 'buscador.html',
})
export class BuscadorPage {
  items = [];

  detail = ProductoPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productos: ProductosProvider) {
  }

  public getItems(event: any): void {
    const term = event.target.value;
    this.productos.search(term).subscribe((items: Array<any>) => {
      this.items = items;
    }, () => {
      this.items = [];
    })
  }
}
