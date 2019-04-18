import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {Observable} from "rxjs";
import {URL_SERVICIOS} from "../../config/url.services";
import {UsuarioProvider} from "../usuario/usuario";

@Injectable()
export class CarritoProvider {
  public orders: Array<any>;
  public items: Array<any>;
  public total: number;

  constructor(public http: HttpClient,
              private alertCtrl: AlertController,
              private storage: Storage,
              private toast: ToastController,
              private user: UsuarioProvider) {
    this.items = [];
    this.orders = [];
    this.total = 0;
    this.storage.ready().then(() => {
      this.storage.get('items').then((response) => {
        this.items = response;
        this.updateTotal();
      });
    });
  }


  public addItem(item: any): void {
    const find = this.items.find((i: any) => i.codigo === item.codigo);
    if (!find) {
      this.items.push(item);
      this.storage.set('items', this.items);
      this.toast.create({
        message: 'Item agregado al carrito',
        duration: 1000
      }).present();
      this.updateTotal();
    } else {
      this.alertCtrl.create({
        title: 'Item existe',
        subTitle: `${item.producto}, ya se encuentra en su carrito de compras`,
        buttons: ['OK']
      }).present()
    }
  }

  public clear(): void {
    this.items = [];
    this.storage.set('items', this.items);
    this.updateTotal();
  }

  public removeItem(item: any): void {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].codigo === item.codigo) {
        index = i;
        break;
      }
    }
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
      this.storage.set('items', this.items);
      this.total = this.items.map((item: any) => item.precio_compra).reduce((a, b) => a + b, 0);
    }
  }

  get empty(): boolean {
    return this.items ? this.items.length === 0 : true;
  }

  private updateTotal(): void {
    this.total = this.items ? this.items.map((item: any) => item.precio_compra).reduce((a, b) => a + b, 0) : 0;
  }

  public createOrder(): Observable<any> {
    return this.http.post(`${URL_SERVICIOS}/orden`, {
      items: this.items.map(item => item.codigo)
    }, {
      headers: {
        'Authorization': `Bearer ${this.user.token}`
      }
    })
  }

  public load() {
    return new Promise((resolve, reject) => {
      this.http.get(`${URL_SERVICIOS}/orden/todas`, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      }).subscribe((orders: any) => {
        this.orders = orders;
      });
      resolve();
    })
  }

  public deleteOrder(order: any): Observable<any> {
    return this.http.delete(`${URL_SERVICIOS}/orden/${order.id}`, {
      headers: {
        'Authorization': `Bearer ${this.user.token}`
      }
    });
  }
}

