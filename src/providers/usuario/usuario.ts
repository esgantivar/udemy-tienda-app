import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {URL_SERVICIOS} from "../../config/url.services";
import {tap} from "rxjs/operators";

@Injectable()
export class UsuarioProvider {
  public token: string;

  constructor(public http: HttpClient,
              private storage: Storage) {
    this.storage.get('token').then((token) => {
      this.token = token;
    })
  }

  public setToken(token: string): void {
    this.token = token;
    this.storage.set('token', this.token);
  }

  get auth(): boolean {
    return !!this.token;
  }

  public login(email: string, password: string) {
    return this.http.post(`${URL_SERVICIOS}/login`, {
      username: email,
      password: password
    }).pipe(tap((response: any) => {
      this.setToken(response.token);
    }));
  }

  public logout(): void {
    this.token = undefined;
    this.storage.remove('token');
  }
}
