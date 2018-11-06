import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

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
  item: any;
  nome: string;
  sobre: string;
  curriculo: string;
  programacao: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider) {
    this.id = navParams.get('id');
  }

  ionViewCanEnter() {
    this.Data.getPalestrante(this.id).subscribe(
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
    this.item = result;
    this.nome = this.item.palestrante.nome;
    this.sobre = this.item.palestrante.sobre;
    this.curriculo = this.item.palestrante.sobre;
    this.programacao = this.item.programacao;
  }

  favorito(programacao) {

  }
}
