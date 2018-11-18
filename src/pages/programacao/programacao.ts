import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { EventoPage } from '../evento/evento';

/**
 * Generated class for the ProgramacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-programacao',
  templateUrl: 'programacao.html',
})
export class ProgramacaoPage {

  opcao = 'todos';
  user: any;
  favoritos: any;
  arrItems: any;
  arrItemsTodos: any;
  arrItemsPalestras: any;
  arrItemsOficinas: any;
  arrItemsFavoritos: any;
  arrFavoritos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    public loadingCtrl: LoadingController) {
      this.getUser();
      this.favoritos = JSON.parse(localStorage.getItem('favoritos'));
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({content: "Aguarde..."});
    loader.present();

    this.Data.getProgramacao().subscribe(
      result => {
        this.arrItems = result;
        this.arrItemsTodos = result;
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

  query = (items, filters) => {
    return items.filter((item) => {
      return filters.reduce((found, filter) => {
        if (!(item[filter.key].includes(filter.value))) return false
        return found
      }, true)
    });
  }

  segment() {
    switch (this.opcao) {
      case 'todos':
        this.arrItems = this.arrItemsTodos;
        break;
      case 'palestras':
        let arrItemsPalestras = JSON.parse(JSON.stringify(this.arrItemsTodos));

        for (let i = 0; i < arrItemsPalestras.length; i++) {
          arrItemsPalestras[i].programacao = this.query(arrItemsPalestras[i].programacao, [{key: 'tipo', value: 'Palestra'}]);
        }

        let arrPalestras = [];
        for (let i = 0; i < arrItemsPalestras.length; i++) {
          if (arrItemsPalestras[i].programacao.length) {
            arrPalestras.push(arrItemsPalestras[i]);
          }
        }
        this.arrItems = arrPalestras;
        
        break;
      case 'oficinas':
        let arrItemsOficinas = JSON.parse(JSON.stringify(this.arrItemsTodos));

        for (let i = 0; i < arrItemsOficinas.length; i++) {
          arrItemsOficinas[i].programacao = this.query(arrItemsOficinas[i].programacao, [{key: 'tipo', value: 'Oficina'}]);
        }

        let arrOficinas = [];
        for (let i = 0; i < arrItemsOficinas.length; i++) {
          if (arrItemsOficinas[i].programacao.length) {
            arrOficinas.push(arrItemsOficinas[i]);
          }
        }
        this.arrItems = arrOficinas;
        break;
      case 'favoritos':
        if (this.favoritos && this.favoritos.hasOwnProperty("programacao")) {
          this.favoritos.programacao.sort((a,b) => (a.dia_order > b.dia_order) ? 1 : ((b.dia_order > a.dia_order) ? -1 : 0));
        }
        this.arrFavoritos = this.favoritos.programacao;

        break;
    }
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
    this.favoritos = data;
  }

  getEvento(programacao) {
    this.navCtrl.push(EventoPage, {id: programacao.id});
  }
}
