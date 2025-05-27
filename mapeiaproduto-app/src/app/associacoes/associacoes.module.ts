import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssociacoesRoutingModule } from './associacoes-routing.module';
import { AssociacoesFormComponent } from './associacoes-form/associacoes-form.component';
import { AssociacoesListaComponent } from './associacoes-lista/associacoes-lista.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AssociacoesFormComponent,
    AssociacoesListaComponent
  ],
  imports: [
    CommonModule,
    AssociacoesRoutingModule,
    FormsModule,
    RouterModule
  ], exports: [
    AssociacoesFormComponent,
    AssociacoesListaComponent
  ]
})
export class AssociacoesModule { }
