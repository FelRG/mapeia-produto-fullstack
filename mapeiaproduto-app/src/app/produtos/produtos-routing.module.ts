import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path: 'produtos', component: LayoutComponent, canActivate:[AuthGuard], children: [
      {path: 'form', component: ProdutosFormComponent},
      {path: 'form/:id', component: ProdutosFormComponent},
      {path: 'lista', component: ProdutosListaComponent},
      {path: '', redirectTo: '/produtos/lista', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
