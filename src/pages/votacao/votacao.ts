import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { VotarPage } from '../votar/votar';

/**
 * Generated class for the VotacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-votacao',
  templateUrl: 'votacao.html',
})
export class VotacaoPage {

  user: any;
  arrOficinas: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    public loadingCtrl: LoadingController, public events: Events) {
      this.getUser();
      this.listenEvents();
    }

  ionViewDidLoad() {}

  listenEvents(){
    this.events.subscribe('reloadDetails',() => {
      this.getUser();
    });
 }

  getUser() {
    let promise = this.Data.getUserLocal();

    Promise.all([promise]).then((res) => {
      this.setUser(res[0]);
    });
  }

  setUser(user) {
    this.user = user;

    let loader = this.loadingCtrl.create({content: "Aguarde..."});
    loader.present();

    this.Data.getVotacao(this.user.id).subscribe(
      result => {
        this.arrOficinas = result;
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        // this.loading = false;
        // this.notify.error('Erro ao retornar o status', {timeout: 3000, showProgressBar: false });
      }
    );
  }

  checkVotacao(programacao) {
    let name = 'checkbox-outline';
    for (var i = 0; i < this.arrOficinas.votados.length; i++) {
      if (this.arrOficinas.votados[i].id_programacao === programacao.id_programacao) {
        if (this.arrOficinas.votados[i].voto === 1) {
          name = 'thumbs-up';
        } else {
          name = 'thumbs-down';
        }
      }
    }
    return name;
  }

  setVotacao(programacao) {
    this.navCtrl.push(VotarPage, {id: programacao.id_programacao, id_user: this.user.id});
  }

}
