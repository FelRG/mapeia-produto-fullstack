import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TemplateModule} from './template/template.module';
import { HomeComponent } from './home/home.component';

import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosService } from './usuarios.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ProdutosService } from './produtos.service';
import { EstabelecimentosModule } from './estabelecimentos/estabelecimentos.module';
import { EstabelecimentosService } from './estabelecimentos.service';
import { AssociacoesModule } from './associacoes/associacoes.module';
import { AssociacoesService } from './associacoes.service';
import { MapaProdutosModule } from './mapa-produtos/mapa-produtos.module';
import { MapaProdutosService } from './mapa-produtos.service';
import { MapaProdutosExternosModule } from './mapa-produtos-externos/mapa-produtos-externos.module';
import { MapaProdutosExternoService } from './mapa-produtos-externo.service';

import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    UsuariosModule,
    ProdutosModule,
    EstabelecimentosModule,
    AssociacoesModule,
    MapaProdutosModule,
    MapaProdutosExternosModule
  ],
  providers: [
    UsuariosService,
    ProdutosService,
    EstabelecimentosService,
    MapaProdutosService,
    AssociacoesService,
    MapaProdutosExternoService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
