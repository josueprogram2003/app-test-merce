import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'agora',
    loadChildren: ()=> import('./modules/modules.module').then(m => m.ModulesModule)
  },
  {
    path:'**',
    redirectTo:'agora'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
