import { Injectable } from '@angular/core';
import { Usuario } from './usuarios/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosBusca } from './usuarios/usuarios-lista/usuariosBusca';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient) { }

  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/mapeia-produto-sistema/usuario', usuario);
  }

  atualizar(usuario: Usuario): Observable<any> {
    return this.http.put<Usuario>(`http://localhost:8080/mapeia-produto-sistema/usuario/${usuario.id}`, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    // const tokenString = localStorage.getItem('token');
    // const token = JSON.parse(tokenString || '{}');
    // const headers = {
    //   'Authorization': 'Bearer ' + token.token
    // }
    // return this.http.get<Usuario[]>('http://localhost:8080/mapeia-produto-sistema/usuario', { headers });
    return this.http.get<Usuario[]>('http://localhost:8080/mapeia-produto-sistema/usuario');
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<any>(`http://localhost:8080/mapeia-produto-sistema/usuario/${id}`);
  }

  getUsuarioByEmail(email: string): Observable<any> {
    const httpParams = new HttpParams().set('email', email);
    const url = 'http://localhost:8080/mapeia-produto-sistema/usuario/findByEmail' + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  deletar(usuario: Usuario): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/mapeia-produto-sistema/usuario/${usuario.id}`);
  }

  // buscar(q: string): Observable<UsuariosBusca[]> {
  //   const httpParams = new HttpParams().set('q', q);
  //   const url = 'http://localhost:8080/mapeia-produto-sistema/usuario/buscar' + "?" + httpParams.toString();
  //   return this.http.get<any[]>(url);
  // }

  buscar(q: string): Observable<Usuario[]> {
    const httpParams = new HttpParams().set('q', q);
    const url = 'http://localhost:8080/mapeia-produto-sistema/usuario/buscar' + "?" + httpParams.toString();
    return this.http.get<any[]>(url);
  }
  
}
