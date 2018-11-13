import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the VotarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-votar',
  templateUrl: 'votar.html',
})
export class VotarPage {

  id: any;
  id_user: any;
  evento: any;
  voto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    public loadingCtrl: LoadingController, public events: Events) {
    this.id = navParams.get('id');
    this.id_user = navParams.get('id_user');
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({content: "Aguarde..."});
    loader.present();

    this.Data.getVotacaoDetalhada(this.id, this.id_user).subscribe(
      result => {
        this.evento = result[0];
        this.voto = this.evento.voto;
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        // this.loading = false;
        // this.notify.error('Erro ao retornar o status', {timeout: 3000, showProgressBar: false });
      }
    );
  }

  send(voto) {
    let data = {
      id_programacao: this.id,
      id_user: this.id_user,
      voto: voto
    }

    let loader = this.loadingCtrl.create({content: "Aguarde..."});
    loader.present();

    this.Data.saveVoto(data).subscribe(
      result => {
        this.events.publish('reloadDetails');
        this.navCtrl.pop();
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        // this.loading = false;
        // this.notify.error('Erro ao retornar o status', {timeout: 3000, showProgressBar: false });
      }
    );
  }
}
