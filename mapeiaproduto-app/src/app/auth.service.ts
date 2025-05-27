import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuarios/usuario';
import { UsuariosService } from './usuarios.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenUrl = 'http://localhost:8080/mapeia-produto-sistema/login';
  jwtHelper: JwtHelperService = new JwtHelperService();
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  private usuarioCarregado = false;


  constructor(
    private http: HttpClient,
    private usuariosService: UsuariosService
  ) {}

  obterToken() {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const token = JSON.parse(tokenString).token;
      return token;
    }
    return null;
  }

  encerrarSessao() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('tipoPermissao');
    this.usuarioCarregado = false; 
    this.usuarioSubject.next(null);
  }

  getEmailDoToken() {
    const token = this.obterToken();
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.sub || null;
    }
    return null;
  }

  getUsuarioAutenticado(): Observable<any> {
    // Se já tem usuário em memória, retorna ele
    console.log('getUsuarioAutenticado');
    if (this.usuarioSubject.value) {
      return this.usuarioSubject.asObservable();
    }
    // Caso contrário, busca pelo e-mail no token e consulta o backend
    const email = this.getEmailDoToken();
    if (email && !this.usuarioCarregado) {
      this.usuarioCarregado = true;

      return this.usuariosService.getUsuarioByEmail(email).pipe(
        tap((usuario) => {
          this.usuarioSubject.next(usuario);

          // Salva os campos desejados individualmente no localStorage
          localStorage.setItem('id', usuario.id?.toString() || '');
          localStorage.setItem('nomeUsuario', usuario.nomeUsuario || '');
          localStorage.setItem('tipoPermissao', usuario.tipoPermissao || '');
        })
      );
    }
    return of(null);
  }

  getUsuarioLocal(): Usuario {
  const id = localStorage.getItem('id');
  const nomeUsuario = localStorage.getItem('nomeUsuario');
  const tipoPermissao = localStorage.getItem('tipoPermissao');

  if (id && nomeUsuario && tipoPermissao) {
    return {
      id: Number(id),
      nomeUsuario: nomeUsuario,
      tipoPermissao: tipoPermissao
    } as Usuario;
  }

  return {} as Usuario;
}


  // getUsuarioAutenticado(){
  //   const token = this.obterToken();
  //   if(token){
  //     const usuario = this.jwtHelper.decodeToken(token).sub;
  //     return usuario;
  //   }
  //   return null;
  // }

  // getPermissaoUsuarioAutenticado(){
  //   const token = this.obterToken();
  //   if(token){
  //     const usuario = this.jwtHelper.decodeToken(token).ROLE;
  //     return usuario;
  //   }
  //   return null;
  // }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/mapeia-produto-sistema/usuario',
      usuario
    );
  }

  tentarLogar(email: string, senha: string): Observable<any> {
    const body = {
      email: email,
      senha: senha,
    };
    return this.http.post<any>(this.tokenUrl, body);
  }
}
