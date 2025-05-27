import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstabelecimentoFormComponent } from './estabelecimento-form/estabelecimento-form.component';
import { EstabelecimentoListaComponent } from './estabelecimento-lista/estabelecimento-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path: 'estabelecimentos', component: LayoutComponent, canActivate:[AuthGuard], children: [
      {path: 'form', component: EstabelecimentoFormComponent},
      {path: 'form/:id', component: EstabelecimentoFormComponent},
      {path: 'lista', component: EstabelecimentoListaComponent},
      {path: '', redirectTo: '/estabelecimentos/lista', pathMatch: 'full'},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstabelecimentosRoutingModule { }
