import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { MapaProdutosRoutingModule } from './mapa-produtos-routing.module';
import { MapaProdutosFormComponent } from './mapa-produtos-form/mapa-produtos-form.component';
import { MapaProdutosDescricaoComponent } from './mapa-produtos-descricao/mapa-produtos-descricao.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MapaProdutosFormComponent,
    MapaProdutosDescricaoComponent
  ],
  imports: [
    CommonModule,
    MapaProdutosRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    MapaProdutosFormComponent,
    MapaProdutosDescricaoComponent
  ]
})
export class MapaProdutosModule { }
