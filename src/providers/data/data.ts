import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  api = 'http://localhost:8000/api';

  constructor(public http: HttpClient) {}

  getProgramacao() {
		return this.http.get(`${this.api}/programacao-list`);
  }

  getPalestrantes() {
    return this.http.get(`${this.api}/uso`);
  }

  getPalestrante(id) {
    return this.http.get(`${this.api}/uso/${id}`);
  }

  /*
  getProgramacao(): Observable<string> {
		return Observable.fromPromise(this.userProvider.getToken()).mergeMap(token => {
			this.token = token;
			const headers = new Headers(); 
			
			headers.append('Authorization', 'Bearer ' + this.token)
			headers.append('Content-Type', 'application/json')
			return this.http.get(`${this.constants.api}/historico?user_id=${id}`, new RequestOptions({headers: headers}))
				.map(response => response.json())
    });
  }
  */

}
