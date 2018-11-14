import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProgramacaoPage } from '../pages/programacao/programacao';
import { PalestrantesPage } from '../pages/palestrantes/palestrantes';
import { InscricaoPage } from '../pages/inscricao/inscricao';
import { VotacaoPage } from '../pages/votacao/votacao';
import { AppVersion } from '@ionic-native/app-version';
import { LoginPage } from '../pages/login/login';
import { DataProvider } from '../providers/data/data';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;
  version: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    private appVersion: AppVersion, private Data: DataProvider, public appCtrl: App,
    public menuCtrl: MenuController) {
    this.initializeApp();
    if(this.platform.is('cordova')) {
      this.appVersion.getVersionNumber().then((version) => {
        this.version = version;
      });
    } else {
      this.version = '1.0.0';
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.Data.clearStorage();
    this.menuCtrl.close();
		this.appCtrl.getRootNav().setRoot(LoginPage);
	}

  openPage(page) {
		switch (page) {
			case 'programacao':
				this.nav.push(ProgramacaoPage);
				break;
			case 'palestrantes':
				this.nav.push(PalestrantesPage);
				break;
			case 'inscricao':
				this.nav.push(InscricaoPage);
        break;
      case 'votacao':
				this.nav.push(VotacaoPage);
				break;
		}
	}
}
