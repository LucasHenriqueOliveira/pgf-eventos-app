import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscritoPage } from './inscrito';

@NgModule({
  declarations: [
    InscritoPage,
  ],
  imports: [
    IonicPageModule.forChild(InscritoPage),
  ],
})
export class InscritoPageModule {}
