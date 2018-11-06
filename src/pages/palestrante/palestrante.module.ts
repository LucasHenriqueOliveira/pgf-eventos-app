import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalestrantePage } from './palestrante';

@NgModule({
  declarations: [
    PalestrantePage,
  ],
  imports: [
    IonicPageModule.forChild(PalestrantePage),
  ],
})
export class PalestrantePageModule {}
