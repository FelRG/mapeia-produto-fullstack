import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { MapaProdutosExternosRoutingModule } from './mapa-produtos-externos-routing.module';
import { MapaProdutosExternosFormComponent } from './mapa-produtos-externos-form/mapa-produtos-externos-form.component';
import { MapaProdutosExternosDescricaoComponent } from './mapa-produtos-externos-descricao/mapa-produtos-externos-descricao.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MapaProdutosExternosFormComponent,
    MapaProdutosExternosDescricaoComponent
  ],
  imports: [
    CommonModule,
    MapaProdutosExternosRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    MapaProdutosExternosFormComponent,
    MapaProdutosExternosDescricaoComponent
  ]
})
export class MapaProdutosExternosModule { }
