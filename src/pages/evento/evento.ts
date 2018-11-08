import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {

  id: any;
  item: any;
  evento: any;
  perguntas = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.Data.getEvento(this.id).subscribe(
      result => {
        this.item = result;
        this.setData(this.item);
      },
      error => {
        // this.loading = false;
        // this.notify.error('Erro ao retornar o status', {timeout: 3000, showProgressBar: false });
      }
    );
  }

  setData(result) {
    this.evento = result.evento;
    this.perguntas = result.perguntas;
  }
}
