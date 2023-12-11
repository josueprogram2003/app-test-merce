import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarHomeComponent } from './pages/sidebar-home/sidebar-home.component';

const routes: Routes = [
  {
    path:'',
    component:SidebarHomeComponent,
    children:[
      {
        path:'categoria',
        loadChildren: ()=> import('../admin/modules/categoria/categoria.module').then(m => m.CategoriaModule)
      }
    ]
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
