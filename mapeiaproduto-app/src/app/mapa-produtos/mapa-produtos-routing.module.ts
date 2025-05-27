import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaProdutosFormComponent } from './mapa-produtos-form/mapa-produtos-form.component';
import { MapaProdutosDescricaoComponent } from './mapa-produtos-descricao/mapa-produtos-descricao.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path: 'mapa-produtos', component: LayoutComponent, canActivate:[AuthGuard], children: [
        {path: 'form', component: MapaProdutosFormComponent},
        // {path: 'form/:id', component: MapaProdutosFormComponent},
        {path: 'descricao', component: MapaProdutosDescricaoComponent},
        {path: '', redirectTo: '/mapa-produtos/form', pathMatch: 'full'},
      ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaProdutosRoutingModule { }
