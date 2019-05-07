import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the InscritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscrito',
  templateUrl: 'inscrito.html',
})
export class InscritoPage {

  id: any;
  user: any;
  item: any;
  nome: string;
  email: string;
  telefone: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    public loadingCtrl: LoadingController) {
    this.id = navParams.get('id');
    this.getUser();
  }

  ionViewCanEnter() {
    let loader = this.loadingCtrl.create({content: "Aguarde..."});
    loader.present();

    this.Data.getParticipante(this.id).subscribe(
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
    this.item = result[0];
    this.nome = this.item.name;
    this.email = this.item.email;
    this.telefone = this.item.telefone;
  }

}
