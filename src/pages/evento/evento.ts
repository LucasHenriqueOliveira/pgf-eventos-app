import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { PerguntaPage } from '../pergunta/pergunta';

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
  user: any;
  programacao: any;
  tipo: any;
  vagas_restantes: any;
  inscrito: boolean = false;
  perguntas = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    private storage: Storage, public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.id = navParams.get('id');

    let promise = this.Data.getUserLocal();

    Promise.all([promise]).then((res) => {
      this.setUser(res[0]);
    });

    let programacao = this.Data.getInscricaoLocal();

    Promise.all([programacao]).then((res) => {
      this.setInscricao(res[0]);
    });
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
    this.tipo = result.evento.tipo;
    this.perguntas = result.perguntas;
    this.vagas_restantes = result.evento.vagas - result.evento.inscritos;
  }

  setUser(user) {
    this.user = user;
  }

  setInscricao(programacao) {
    this.programacao = programacao;

    for(var i = 0; i < this.programacao.length; i++) {
      if (this.programacao[i].id_programacao === this.id) this.inscrito = true;
    }
  }

  checkDisable() {
    let date = this.evento.dia.split('/');
    let hour = this.evento.hora_inicio.split(':');
    const dateEvento = new Date(date[2], parseInt(date[1]) - 1, date[0], hour[0], hour[1], 0);
    const dateNow = new Date();
    
    if (dateEvento < dateNow) {
      return true;
    }
    return false;
  }

  checkButton(tipo) {
    if(tipo === 'inscrever') {
      return !this.inscrito && this.tipo === 'Oficina' && this.vagas_restantes;
    } else {
      return this.inscrito && this.tipo === 'Oficina';
    }
  }

  inscricao() {

    let alert = this.alertCtrl.create({
      title: 'Inscrição',
      message: 'Deseja confirmar a inscrição?',
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
              id_programacao: this.id,
              id_user: this.user.id
            }

            this.Data.inscricao(data).subscribe(
              result => {
                this.storage.remove('programacao');
                this.storage.set('programacao', result['data']);
                this.inscrito = true;
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

  removeInscricao() {
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
              id_programacao: this.id,
              id_user: this.user.id
            }

            this.Data.cancelarInscricao(data).subscribe(
              result => {
                this.storage.remove('programacao');
                this.storage.set('programacao', result['data']);
                this.inscrito = false;
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

  openModalPergunta() {

    let perguntaModal = this.modalCtrl.create(PerguntaPage, { tipo: 'pergunta' });
    perguntaModal.present();

    perguntaModal.onDidDismiss(result => {  
      if(result) {
        let loader = this.loadingCtrl.create({content: "Aguarde..."});
        loader.present();
        
        let data = {
          id_programacao: this.id,
          id_user: this.user.id,
          pergunta: result.data
        }

        this.Data.perguntar(data).subscribe(
          result => {
            this.perguntas = result['data'];
            
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
    });
  }

  openModalResposta(id_pergunta) {
    let respostaModal = this.modalCtrl.create(PerguntaPage, { tipo: 'resposta' });
    respostaModal.present();

    respostaModal.onDidDismiss(result => {  
      if(result) {
        let loader = this.loadingCtrl.create({content: "Aguarde..."});
        loader.present();
        
        let data = {
          id_programacao: this.id,
          id_user: this.user.id,
          resposta: result.data,
          id_pergunta: id_pergunta
        }

        this.Data.responder(data).subscribe(
          result => {
            this.perguntas = result['data'];
            
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
    });
  }
}
