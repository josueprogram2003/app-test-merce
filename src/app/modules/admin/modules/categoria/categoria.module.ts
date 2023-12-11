import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaService } from './services/categoria.service';
import { ModalAddComponent } from './components/modal-add/modal-add.component';



@NgModule({
  declarations: [
    CategoriaComponent,
    ModalAddComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers:[
    CategoriaService
  ]
})
export class CategoriaModule { }
