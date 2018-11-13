import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  
  private formSignUp: FormGroup;
  dataSignup: any = [];
	dataUser: any = [];
	emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, private Data: DataProvider) {

      this.formSignUp = this.formBuilder.group({
        name: this.formBuilder.control('', [Validators.required]),
        email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        password: this.formBuilder.control('', [Validators.required]),
        password_confirmation: this.formBuilder.control('', [Validators.required])
      })
  }

  ionViewDidLoad() {}

  signup(form) {

    let email = form.email;
    let dominio = email.split("@");

    if (dominio[1] !== 'agu.gov.br') {
      let toast = this.toastCtrl.create({
        message: 'Só é permitido o cadastro de emails do domínio agu.gov.br!',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      return false;
    }

    if (form.password !== form.password_confirmation) {
      let toast = this.toastCtrl.create({
        message: 'Senha e a confirmação da senha não conferem!',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      return false;
    }

    let loader = this.loadingCtrl.create({content: "Aguarde..."});
		loader.present();

		this.Data.signup(form).subscribe(data => {

      loader.dismiss();
      let toast = this.toastCtrl.create({
        message: data['message'],
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      this.navCtrl.push(LoginPage);

		  }, err => {
			loader.dismiss();
			let toast = this.toastCtrl.create({
				message: err.error.error,
				duration: 3000,
				position: 'middle'
			});
      toast.present();
    })
  }
}
