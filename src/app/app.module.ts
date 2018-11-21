import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProgramacaoPage } from '../pages/programacao/programacao';
import { PalestrantesPage } from '../pages/palestrantes/palestrantes';
import { InscricaoPage } from '../pages/inscricao/inscricao';
import { VotacaoPage } from '../pages/votacao/votacao';
import { LoginPage } from '../pages/login/login';
import { DataProvider } from '../providers/data/data';
import { HttpClientModule } from '@angular/common/http'; 
import { PalestrantePage } from '../pages/palestrante/palestrante';
import { AppVersion } from '@ionic-native/app-version';
import { EventoPage } from '../pages/evento/evento';
import { IntroPage } from '../pages/intro/intro';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerguntaPage } from '../pages/pergunta/pergunta';
import { VotarPage } from '../pages/votar/votar';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProgramacaoPage,
    PalestrantesPage,
    PalestrantePage,
    InscricaoPage,
    VotacaoPage,
    EventoPage,
    IntroPage,
    CadastroPage,
    PerguntaPage,
    VotarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'md'
    }),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProgramacaoPage,
    PalestrantesPage,
    PalestrantePage,
    InscricaoPage,
    VotacaoPage,
    EventoPage,
    IntroPage,
    CadastroPage,
    PerguntaPage,
    VotarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AppVersion,
    File,
    FileTransfer,
    DocumentViewer
  ]
})
export class AppModule {}
