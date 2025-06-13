import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produto } from './produtos/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private readonly apiUrl = 'http://localhost:8080/mapeia-produto-sistema/produto';
  private readonly apiUrlBasico = 'http://localhost:8080/mapeia-produto-sistema';

  constructor(private http: HttpClient) { }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto);
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  deletar(produto: Produto): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${produto.id}`);
  }

  buscar(q: string): Observable<Produto[]> {
    const httpParams = new HttpParams().set('q', q);
    const url = this.apiUrl + "/buscar" + "?" + httpParams.toString();
    return this.http.get<any[]>(url);
  }

  salvarComImagem(formData: FormData) {
    return this.http.post<Produto>(`${this.apiUrl}/upload`, formData);
  }

  atualizarComImagem(id: number, formData: FormData) {
    return this.http.put<Produto>(`${this.apiUrl}/upload/${id}`, formData);
  }

  getImagemUrl(nomeArquivo: string): string {
    return `${this.apiUrlBasico}${nomeArquivo}`;
  }



}
