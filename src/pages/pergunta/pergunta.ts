import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the PerguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pergunta',
  templateUrl: 'pergunta.html',
})
export class PerguntaPage {

  title: any;
  label: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private alertCtrl: AlertController) {

      switch(this.navParams.get('tipo')) {
        case 'pergunta':
          this.title = 'Pergunta';
          this.label = 'Digite a sua pergunta';
          break;
        case 'resposta':
          this.title = 'Resposta';
          this.label = 'Digite a sua resposta';
          break;
      }
  }

  ionViewDidLoad() {}

  send(data) {
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Deseja enviar?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.viewCtrl.dismiss({ data: data });
          }
        }
      ]
    });
    alert.present();
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
