import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProductosProvider} from "../../providers";
import {ProductoPage} from "..";

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  public category: any;
  public producto = ProductoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ps: ProductosProvider) {
    this.category = this.navParams.get('categoria');
    this.ps.filtered = [];
    this.ps.pageFiltered = 1;
    this.ps.loadFilter(this.category);
  }


  public load(inifite): void {
    this.ps.loadFilter(this.category).then(() => {
      inifite.complete();
    });
  }
}
