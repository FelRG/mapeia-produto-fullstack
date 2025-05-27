import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaProdutosExternosFormComponent } from './mapa-produtos-externos-form/mapa-produtos-externos-form.component';
import { MapaProdutosExternosDescricaoComponent } from './mapa-produtos-externos-descricao/mapa-produtos-externos-descricao.component';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {path: 'mapa-produtos-externos', component: LayoutComponent, children: [
          {path: 'form', component: MapaProdutosExternosFormComponent},
          // {path: 'form/:id', component: MapaProdutosFormComponent},
          {path: 'descricao', component: MapaProdutosExternosDescricaoComponent},
          {path: '', redirectTo: '/mapa-produtos-externos/form', pathMatch: 'full'},
        ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaProdutosExternosRoutingModule { }
