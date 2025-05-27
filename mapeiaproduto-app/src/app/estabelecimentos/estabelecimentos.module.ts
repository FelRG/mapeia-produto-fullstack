import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstabelecimentosRoutingModule } from './estabelecimentos-routing.module';
import { EstabelecimentoFormComponent } from './estabelecimento-form/estabelecimento-form.component';
import { EstabelecimentoListaComponent } from './estabelecimento-lista/estabelecimento-lista.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    EstabelecimentoFormComponent,
    EstabelecimentoListaComponent
  ],
  imports: [
    CommonModule,
    EstabelecimentosRoutingModule,
    FormsModule,
    RouterModule
  ], exports: [
    EstabelecimentoFormComponent,
    EstabelecimentoListaComponent
  ]
})
export class EstabelecimentosModule { }
