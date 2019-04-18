import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {URL_SERVICIOS} from "../../config/url.services";
import {Observable} from "rxjs";

@Injectable()
export class ProductosProvider {
  page: number;
  products: Array<any>;
  filtered: Array<any>;
  pageFiltered: number;
  lines: Array<any>;

  constructor(public http: HttpClient) {
    this.page = 1;
    this.pageFiltered = 1;
    this.products = [];
    this.filtered = [];
  }

  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${URL_SERVICIOS}/productos/todos/${this.page}`).subscribe((response: any) => {
        this.products.push(...response);
        this.page++;
        resolve();
      }, () => {
        reject();
      });
    });
  }

  public loadLines(): void {
    this.http.get(`${URL_SERVICIOS}/lineas`).subscribe((response: any) => {
      this.lines = response;
    }, () => {
      this.lines = [];
    });
  }

  public loadFilter(category: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${URL_SERVICIOS}/productos/${category.id}/${this.pageFiltered}`).subscribe((response: any) => {
        this.filtered.push(...response);
        this.pageFiltered++;
      });
      resolve();
    });
  }

  public search(term: string): Observable<any> {
    return this.http.get(`${URL_SERVICIOS}/productos/buscar/${term}`)
  }
}
