import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

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
  arrItems: any;
  arrItemsTodos: any;
  arrItemsPalestras: any;
  arrItemsOficinas: any;
  arrItemsFavoritos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider) {
  }

  ionViewDidLoad() {
    this.Data.getProgramacao().subscribe(
      result => {
        this.arrItems = result;
        this.arrItemsTodos = this.arrItems;
      },
      error => {
        // this.loading = false;
        // this.notify.error('Erro ao retornar o status', {timeout: 3000, showProgressBar: false });
      }
    );
  }

  segment() {
    switch (this.opcao) {
      case 'todos':
        this.arrItems = this.arrItemsTodos;
        break;
      case 'palestras':
        // this.arrItemsPalestras = [];

        this.arrItems.forEach(function (item) {
          (item.programacao).forEach(function(items, index, object) {
            if (items.tipo === 'Palestra') {
              //this.arrItemsPalestras.push('teste');
              //this.arrItemsPalestras['data'] = item.data;
              //this.arrItemsPalestras[index] = items;
              //console.log(this.arrItemsPalestras);
              //console.log(items);
              //object.splice(index, 1);
            }
          });
          /*
          item.programacao.filter(programacao => {
            let value = programacao.tipo.indexOf("Palestra");
            if (value === -1) {
              (item.programacao).splice(value, 1);
            }
          });
          */
        });
        //console.log(this.arrItemsPalestras);
        break;
      case 'oficinas':
        this.arrItems = [];
        break;
      case 'favoritos':
        this.arrItems = []; 
        break;
    }
  }
}
