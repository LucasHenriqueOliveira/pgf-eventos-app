import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the AvisosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avisos',
  templateUrl: 'avisos.html',
})
export class AvisosPage {

  arrAvisos: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    public loadingCtrl: LoadingController) {
      this.getAvisos();
  }

  ionViewDidLoad() {}

  getAvisos() {

    let loader = this.loadingCtrl.create({content: "Aguarde..."});
    loader.present();

    this.Data.getAvisos().subscribe(
      result => {
        this.arrAvisos = result;
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
