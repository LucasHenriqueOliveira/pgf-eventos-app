import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private Data: DataProvider) {
    this.Data.getUserData().subscribe(res => {
      this.setData(res);
    }, err => {
      console.log('error: '+ err)
    });
  }

  ionViewDidLoad() {
  }

  setData(user) {
    if (user) {
      this.navCtrl.push(HomePage);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
}
