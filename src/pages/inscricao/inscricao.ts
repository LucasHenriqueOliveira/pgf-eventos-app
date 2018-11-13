import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { EventoPage } from '../evento/evento';
import { ProgramacaoPage } from '../programacao/programacao';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the InscricaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscricao',
  templateUrl: 'inscricao.html',
})
export class InscricaoPage {
  
  programacao: any = [];
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    private storage: Storage, public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let promise = this.Data.getInscricaoLocal();

    Promise.all([promise]).then((res) => {
      this.setData(res[0]);
    });

    let user = this.Data.getUserLocal();

    Promise.all([user]).then((res) => {
      this.setUser(res[0]);
    });
  }

  setData(result) {
    this.programacao = result;
  }

  setUser(user) {
    this.user = user;
  }

  getProgramacao(programacao) {
    this.navCtrl.push(EventoPage, {id: programacao.id});
  }

  goProgramacao() {
    this.navCtrl.push(ProgramacaoPage);
  }

  removeInscricao(programacao) {
    let alert = this.alertCtrl.create({
      title: 'Cancelamento',
      message: 'Tem certeza que deseja cancelar a inscrição?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            let loader = this.loadingCtrl.create({content: "Aguarde..."});
            loader.present();
            
            let data = {
              id_programacao: programacao.id,
              id_user: this.user.id
            }

            this.Data.cancelarInscricao(data).subscribe(
              result => {
                this.storage.remove('programacao');
                this.storage.set('programacao', result['data']);
                this.programacao = result['data'];
                loader.dismiss();
        
                let toast = this.toastCtrl.create({
                  message: result['message'],
                  duration: 3000,
                  position: 'middle'
                });
                toast.present();
              },
              err => {
                loader.dismiss();
                let toast = this.toastCtrl.create({
                  message: err.error.error,
                  duration: 3000,
                  position: 'middle'
                });
                toast.present();
              }
            );
          }
        }
      ]
    });
    alert.present();
  }
}
