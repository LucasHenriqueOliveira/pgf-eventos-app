import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { EventoPage } from '../evento/evento';

/**
 * Generated class for the PalestrantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-palestrante',
  templateUrl: 'palestrante.html',
})
export class PalestrantePage {
  id: any;
  user: any;
  favoritos: any;
  item: any;
  nome: string;
  sobre: string;
  curriculo: string;
  programacao: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    public loadingCtrl: LoadingController) {
    this.id = navParams.get('id');
    this.getUser();
    this.favoritos = JSON.parse(localStorage.getItem('favoritos'));
  }

  ionViewCanEnter() {
    let loader = this.loadingCtrl.create({content: "Aguarde..."});
    loader.present();

    this.Data.getPalestrante(this.id).subscribe(
      result => {
        this.item = result;
        this.setData(this.item);
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        // this.loading = false;
        // this.notify.error('Erro ao retornar o status', {timeout: 3000, showProgressBar: false });
      }
    );
  }

  getUser() {
    let promise = this.Data.getUserLocal();

    Promise.all([promise]).then((res) => {
      this.setUser(res[0]);
    });
  }

  setUser(user) {
    this.user = user;
  }

  setData(result) {
    this.item = result;
    this.nome = this.item.palestrante.nome;
    this.sobre = this.item.palestrante.sobre;
    this.curriculo = this.item.palestrante.sobre;
    this.programacao = this.item.programacao;
  }

  checkFavorito(id) {
    let icon = 'heart-outline';
  
    if (this.favoritos && this.favoritos.hasOwnProperty("programacao")) {
      for (let i = 0; i < this.favoritos.programacao.length; i++) {
        if (this.favoritos.programacao[i].id === id) {
          icon = 'heart';
        }
      }
    }
    return icon;
  }

  favorito(result) {
    let programacao = [];
    if (this.favoritos && this.favoritos.hasOwnProperty("programacao")) {
      programacao = this.favoritos.programacao;
    }

    if (programacao.length) {
      let exist = false;
      for (let i = 0; i < programacao.length; i++) {
        if (programacao[i].id === result.id) {
          exist = true;
          programacao.splice(i, 1); 
        }
      }

      if (!exist) {
        programacao.push(result);
      } else {

      }
    } else {
      programacao.push(result);
    }

    let data = {
      user: this.user.id,
      programacao: programacao
    }
    localStorage.setItem('favoritos', JSON.stringify(data));
  }

  getProgramacao(programacao) {
    this.navCtrl.push(EventoPage, {id: programacao.id});
  }
}
