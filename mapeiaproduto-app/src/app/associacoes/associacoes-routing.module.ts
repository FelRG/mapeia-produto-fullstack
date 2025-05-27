import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociacoesFormComponent} from './associacoes-form/associacoes-form.component';
import { AssociacoesListaComponent } from './associacoes-lista/associacoes-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path: 'associacoes', component: LayoutComponent, canActivate:[AuthGuard], children: [
      {path: 'form', component: AssociacoesFormComponent},
      {path: 'form/:id', component: AssociacoesFormComponent},
      {path: 'lista', component: AssociacoesListaComponent},
      {path: '', redirectTo: '/associacoes/lista', pathMatch: 'full'},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociacoesRoutingModule { }
