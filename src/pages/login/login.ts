import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CadastroPage } from '../cadastro/cadastro';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private formLogin: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  dataToken: any = [];
	dataUser: any = [];
  dataForgotEmail: any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private storage: Storage, public loadingCtrl: LoadingController, private Data: DataProvider,
    private toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.formLogin = this.formBuilder.group({
			email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
			password: this.formBuilder.control('', [Validators.required])
      });
  }

  ionViewDidLoad() {
  }

  signup() {
		this.navCtrl.push(CadastroPage);
  }
  
  login(login) {
		this.storage.clear();
		let loader = this.loadingCtrl.create({content: "Aguarde..."});
		loader.present();

		this.Data.login(login).subscribe(data => {
      this.dataToken = data;
			this.storage.set('token', this.dataToken.access_token);

			this.Data.getUser(this.dataToken.user.id).subscribe(res => {

				this.dataUser = res;
        this.storage.set('user', this.dataToken.user);
        this.storage.set('programacao', res);
				loader.dismiss();
        this.navCtrl.push(HomePage);
        
      }, err => {

				this.storage.clear();
				loader.dismiss();
				let toast = this.toastCtrl.create({
					message: 'Usuário não encontrado!',
					duration: 3000,
					position: 'middle'
        });
        toast.present();
        
      })
    }, err => {

			this.storage.clear();
      loader.dismiss();
			let toast = this.toastCtrl.create({
				message: err.error.error,
				duration: 3000,
				position: 'middle'
			});
      toast.present();

    })
  }
  
  esqueceuSenha() {
		let prompt = this.alertCtrl.create({
		  title: 'Esqueceu a senha?',
		  message: "Entre com o seu e-mail cadastrado",
		  inputs: [
			{
			  name: 'email',
			  placeholder: 'Seu e-mail'
			},
		  ],
		  buttons: [
			{
			  text: 'Cancelar'
			},
			{
			  text: 'Enviar',
			  handler: data => {
				let loader = this.loadingCtrl.create({content: "Aguarde..."});
				loader.present();

				this.Data.esqueceuSenha(data).subscribe(res => {
					this.dataForgotEmail = res
					loader.dismiss();
					if(this.dataForgotEmail.error) {
						let toast = this.toastCtrl.create({
							message: this.dataForgotEmail.message,
							duration: 3000,
							position: 'middle',
							cssClass: 'toast-error'
						});
						toast.present();
					} else {
						let toast = this.toastCtrl.create({
							message: "Enviamos um email com informações da nova senha!",
							duration: 3000,
							position: 'middle',
							cssClass: 'toast-success'
						});
						toast.present();
					}
				  }, err => {
					loader.dismiss();
					let toast = this.toastCtrl.create({
						message: err.error.error,
						duration: 3000,
						position: 'middle',
						cssClass: 'toast-error'
					});
					toast.present();
				  })
			  }
			}
		  ]
		});
		prompt.present();
	}
}
