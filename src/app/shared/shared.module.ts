import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadPageComponent } from './components/preload-page/preload-page.component';
import { HeaderSidebarComponent } from './components/header-sidebar/header-sidebar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderListPipe } from './pipes/order-list.pipe';
import { ButtonDeleteComponent } from './components/buttons/button-delete/button-delete.component';
import { ButtonUpdateComponent } from './components/buttons/button-update/button-update.component';

@NgModule({
  declarations: [
    PreloadPageComponent,
    HeaderSidebarComponent,
    SidebarComponent,
    TableComponent,
    OrderListPipe,
    ButtonDeleteComponent,
    ButtonUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  exports:[
    PreloadPageComponent,
    HeaderSidebarComponent,
    SidebarComponent,
    TableComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers:[OrderListPipe]
})
export class SharedModule { }
