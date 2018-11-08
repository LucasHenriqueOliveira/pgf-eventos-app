import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  api = 'http://localhost:8000/api';

  constructor(public http: HttpClient, private storage: Storage) {}

  getProgramacao() {
		return this.http.get(`${this.api}/programacao-list`);
  }

  getPalestrantes() {
    return this.http.get(`${this.api}/uso`);
  }

  getPalestrante(id) {
    return this.http.get(`${this.api}/uso/${id}`);
  }

  getEvento(id) {
    return this.http.get(`${this.api}/evento/${id}`);
  }

  login(login) {
		let options = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post(`${this.api}/login`, JSON.stringify(login), {headers: options});
  }

  getUser(id) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.get(`${this.api}/user/${id}`, {headers: options});
  }

  getUserLocal() {
    return this.storage.get('user').then((token) => {
			return token;
		});
  }

  getToken() {
		return this.storage.get('token').then((token) => {
			return token;
		});
  }

  getInscricaoLocal() {
    return this.storage.get('programacao').then((programacao) => {
			return programacao;
		});
  }
  
  clearStorage(){
    this.storage.remove('token');
    this.storage.remove('user');
    this.storage.remove('programacao');
  }
}
