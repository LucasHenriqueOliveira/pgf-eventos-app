import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the DocumentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documento',
  templateUrl: 'documento.html',
})
export class DocumentoPage {

  documento: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private document: DocumentViewer,
    private file: File, private transfer: FileTransfer, private platform: Platform, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let path = null;
    let documento = 'https://pfe-eventos.herokuapp.com/files/' + this.navParams.get('documento');

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }

    const transfer = this.transfer.create();
    let loader = this.loadingCtrl.create({content: "Aguarde o download..."});
    loader.present();
    transfer.download(documento, path + 'my_file.pdf')
      .then(entry => {
        let url = entry.toUrl();
        this.document.viewDocument(url, 'application/pdf', {});
        loader.dismiss();
      });
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
