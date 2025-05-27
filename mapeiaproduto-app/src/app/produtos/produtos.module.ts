import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProdutosFormComponent,
    ProdutosListaComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    FormsModule,
    RouterModule
  ], 
  exports: [
    ProdutosFormComponent,
    ProdutosListaComponent
  ]
})
export class ProdutosModule { }
