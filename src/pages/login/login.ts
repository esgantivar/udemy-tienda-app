import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UsuarioProvider} from "../../providers";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: string;
  public password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private user: UsuarioProvider,
              private loading: LoadingController,
              private alert: AlertController) {
    this.email = 'sneyder.gantiva@gmail.com';
    this.password = 'mmorena11';
  }

  public login(): void {
    const loading = this.loading.create();
    loading.present();
    this.user.login(this.email, this.password).subscribe(() => {
      loading.dismissAll();
      this.viewCtrl.dismiss(true);
    }, () => {
      loading.dismissAll();
      this.alert.create({
        message: 'Se ha presentado un error',
        buttons: ['OK']
      }).present();
    });
  }
}
