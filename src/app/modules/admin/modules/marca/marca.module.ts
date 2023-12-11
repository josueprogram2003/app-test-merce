import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaComponent } from './pages/marca/marca.component';


@NgModule({
  declarations: [
    MarcaComponent
  ],
  imports: [
    CommonModule,
    MarcaRoutingModule
  ]
})
export class MarcaModule { }
