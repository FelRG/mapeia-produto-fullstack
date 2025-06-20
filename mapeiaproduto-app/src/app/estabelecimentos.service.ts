import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estabelecimento } from './estabelecimentos/estabelecimento';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosService {

  private readonly apiUrl = 'http://localhost:8080/mapeia-produto-sistema/estabelecimento';

  constructor(private http: HttpClient) { }

  salvar(estabelecimento: Estabelecimento): Observable<Estabelecimento> {
    return this.http.post<Estabelecimento>(this.apiUrl, estabelecimento);
  }

  atualizar(estabelecimento: Estabelecimento): Observable<Estabelecimento> {
    return this.http.put<Estabelecimento>(`${this.apiUrl}/${estabelecimento.id}`, estabelecimento);
  }

  getEstabelecimentos(): Observable<Estabelecimento[]> {
    return this.http.get<Estabelecimento[]>(this.apiUrl);
  }

  getEstabelecimentoById(id: number): Observable<Estabelecimento> {
    return this.http.get<Estabelecimento>(`${this.apiUrl}/${id}`);
  }

  deletar(estabelecimento: Estabelecimento): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${estabelecimento.id}`);
  }

  buscar(q: string): Observable<Estabelecimento[]> {
    const httpParams = new HttpParams().set('q', q);
    const url = this.apiUrl + "/buscar?" + httpParams.toString();
    return this.http.get<Estabelecimento[]>(url);
  }

  buscarPrimeiros(limite: number) {
    return this.http.get<Estabelecimento[]>(`${this.apiUrl}?limite=${limite}`);
  }

}
