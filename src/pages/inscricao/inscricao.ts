import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { InscritoPage } from '../../pages/inscrito/inscrito';

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
  
  searchQuery: string = '';
  items: any;
  arrItems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider,
    public loadingCtrl: LoadingController) {
    this.initializeItems();
  }

  initializeItems() {
    let loader = this.loadingCtrl.create({content: "Aguarde..."});
    loader.present();

    this.Data.getParticipantes().subscribe(
      result => {
        this.items = result;
        this.arrItems = this.items;
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        // this.loading = false;
        // this.notify.error('Erro ao retornar o status', {timeout: 3000, showProgressBar: false });
      }
    );
  }

  ionViewDidLoad() {}

  query = (items, filters) => {
    return items.filter((item) => {
      return filters.reduce((found, filter) => {
        if (!(item[filter.key].includes(filter.value))) return false
        return found
      }, true)
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = this.arrItems;

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.query(this.items, [{key: 'name', value: val}]);
    }
  }

  getParticipante(item) {
    this.navCtrl.push(InscritoPage, {id: item.id});
  }
}
