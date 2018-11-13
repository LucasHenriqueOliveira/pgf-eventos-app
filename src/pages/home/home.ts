import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProgramacaoPage } from '../programacao/programacao';
import { PalestrantesPage } from '../palestrantes/palestrantes';
import { InscricaoPage } from '../inscricao/inscricao';
import { VotacaoPage } from '../votacao/votacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: any;

  constructor(public navCtrl: NavController, private Data: DataProvider) {

  }

  ionViewDidLoad() {
    let promise = this.Data.getUserLocal();

    Promise.all([promise]).then((res) => {
      this.setData(res[0]);
    });
  }

  setData(result) {
    let firstName = (result.name).split(" ");
    this.name = firstName[0];
  }

  openPage(page) {
    switch (page) {
			case 'programacao':
				this.navCtrl.push(ProgramacaoPage);
				break;
			case 'palestrantes':
				this.navCtrl.push(PalestrantesPage);
				break;
			case 'inscricao':
				this.navCtrl.push(InscricaoPage);
        break;
      case 'votacao':
				this.navCtrl.push(VotacaoPage);
				break;
		}
  }
}
