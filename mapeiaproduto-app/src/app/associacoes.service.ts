import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Associacao } from './associacoes/associacoes';

@Injectable({
  providedIn: 'root'
})
export class AssociacoesService {

  private readonly apiUrl = 'http://localhost:8080/mapeia-produto-sistema/associacao';

  constructor(private http: HttpClient) { }

  salvar(associacao: Associacao): Observable<Associacao> {
    return this.http.post<Associacao>(this.apiUrl, Associacao.toDTO(associacao));
  }

  atualizar(associacao: Associacao): Observable<Associacao> {
    return this.http.put<Associacao>(`${this.apiUrl}/${associacao.id}`, Associacao.toDTO(associacao));
  }

  getAssociacoes(): Observable<Associacao[]> {
    return this.http.get<Associacao[]>(this.apiUrl);
  }

  getAssociacaoById(id: number): Observable<Associacao> {
    return this.http.get<Associacao>(`${this.apiUrl}/${id}`);
  }

  deletar(associacao: Associacao): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${associacao.id}`);
  }

  buscar(q: string): Observable<Associacao[]> {
    const httpParams = new HttpParams().set('q', q);
    const url = this.apiUrl + "/buscar?" + httpParams.toString();
    return this.http.get<Associacao[]>(url);
  }

  buscarPorProduto(produtoId: number): Observable<Associacao[]> {
    return this.http.get<Associacao[]>(`${this.apiUrl}/produto/${produtoId}`);
  }

}
