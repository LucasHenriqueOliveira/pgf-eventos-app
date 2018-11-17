import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

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

  esqueceuSenha(data) {
		let options = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post(`${this.api}/reset`, JSON.stringify(data), {headers: options});
  }

  signup(signup) {
    let options = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post(`${this.api}/signup`, JSON.stringify(signup), {headers: options});
  }

  getUser(id) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.get(`${this.api}/user/${id}`, {headers: options});
  }

  inscricao(data) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.post(`${this.api}/inscricao`, data, {headers: options});
  }

  cancelarInscricao(data) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.post(`${this.api}/inscricao-cancelar`, data, {headers: options});
  }

  perguntar(data) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.post(`${this.api}/pergunta`, data, {headers: options});
  }

  responder(data) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.post(`${this.api}/resposta`, data, {headers: options});
  }

  getVotacao(id) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.get(`${this.api}/votacao/${id}`, {headers: options});
  }

  getVotacaoDetalhada(id, id_user) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.get(`${this.api}/votacao-detalhada/${id}/${id_user}`, {headers: options});
  }

  saveVoto(data) {
    let options = new HttpHeaders();
    options.set('Authorization','Bearer ' + this.getToken());
    options.set('Content-Type', 'application/json');
    return this.http.post(`${this.api}/voto`, data, {headers: options});
  }

  getUserData(): Observable<string> {
		return Observable.fromPromise(this.getUserLocal()).map(user => {
			return user;
		});		
	}

  getUserLocal() {
    return this.storage.get('user').then((user) => {
			return user;
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
