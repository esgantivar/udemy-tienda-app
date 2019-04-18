import {Component} from '@angular/core';
import {InfiniteScroll, ModalController, NavController} from 'ionic-angular';
import {CarritoProvider, ProductosProvider, UsuarioProvider} from "../../providers";
import {CarritoPage, LoginPage, ProductoPage} from "..";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private productosProvider: ProductosProvider,
              private carrito: CarritoProvider,
              private user: UsuarioProvider,
              private modal: ModalController) {
    this.productosProvider.load();
    this.productosProvider.loadLines();
  }

  public load(infiniteScroll: InfiniteScroll): void {
    this.productosProvider.load().then(() => {
      infiniteScroll.complete();
    })
  }

  public showDetail(item: any): void {
    this.navCtrl.push(ProductoPage, {
      product: item
    });
  }

  get count(): number {
    return this.carrito.items.length;
  }

  get auth(): boolean {
    return this.user.auth;
  }

  public showCart(): void {
    if (this.user.auth) {
      this.modal.create(CarritoPage).present();
    } else {
      const modal = this.modal.create(LoginPage);
      modal.present();
      modal.onDidDismiss((login: boolean) => {
        if (login) {
          this.modal.create(CarritoPage).present();
        }
      });
    }
  }

  public logout(): void {
    this.user.logout();
  }
}
