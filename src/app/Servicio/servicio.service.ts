import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../Data/Usuario';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  // private url0 = 'http://secdet.pro/APIKardexPrendasVestir/V1/';

  private url0 = 'https://rsgm.online/APIFarmacia/V1/';

  constructor(protected http: HttpClient) {
  }

  getUsuario(usuario: number, password: string): Observable<Usuario> {
    // const url1 = this.url0 + 'getusu' + '&usuario=' + usuario + '&password=' + password;
    const url1 = `${this.url0}getusu&usuario=${usuario}&password=${password}`;
    return this.http.get<Usuario>(url1);
  }

  servicio(object: Object) {
    return this.http.post(this.url0, object).pipe(
      map(res => res));
  }

  login(loginObj: Object): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(this.url0, loginObj).pipe(
      map(res => res));
  }

  /*getCategorias(categoObj: Object) {
    return this.http.post(this.url0, categoObj).pipe(
      map(res => res));
  }

  /!*getMarcas(MarcObj: Object): Observable<Marcas[]> {
    return this.http.post<Marcas[]>(this.url0, MarcObj).pipe(
      map(res => res));
  }*!/

  getMarcas(MarcObj: Object) {
    return this.http.post(this.url0, MarcObj).pipe(
      map(res => res));
  }

  setPrendas(PrendObj: Object) {
    return this.http.post<Prendas[]>(this.url0, PrendObj).pipe(
      map(res => res));
  }*/
}
