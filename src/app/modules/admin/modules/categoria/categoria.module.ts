import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaService } from './services/categoria.service';
import { ModalAddComponent } from './components/modal-add/modal-add.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUpdateComponent } from './components/modal-update/modal-update.component';

@NgModule({
  declarations: [
    CategoriaComponent,
    ModalAddComponent,
    ModalUpdateComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers:[
    CategoriaService
  ]
})
export class CategoriaModule { }
