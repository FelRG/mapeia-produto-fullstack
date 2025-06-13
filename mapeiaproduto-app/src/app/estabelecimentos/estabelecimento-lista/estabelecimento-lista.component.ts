import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estabelecimento } from '../estabelecimento';
import { EstabelecimentosService } from '../../estabelecimentos.service';

@Component({
  selector: 'app-estabelecimento-lista',
  templateUrl: './estabelecimento-lista.component.html',
  styleUrls: ['./estabelecimento-lista.component.css']
})
export class EstabelecimentoListaComponent implements OnInit {

  estabelecimentos: Estabelecimento[] = [];
  estabelecimentoSelecionado!: Estabelecimento;
  mensagemSucesso!: string;
  mensagemErro!: string;
  q!: string;
  messagemErroBusca!: string;

  paginaAtual: number = 1;
  tamanhoPagina: number = 5;

  constructor(
    private service: EstabelecimentosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getEstabelecimentos().subscribe(resposta => this.estabelecimentos = resposta);
  }

  novoCadastro() {
    this.router.navigate(['/estabelecimentos/form']);
  }

  preparaDelecao(estabelecimento: Estabelecimento) {
    this.estabelecimentoSelecionado = estabelecimento;
  }

  deletarEstabelecimento() {
    this.service.deletar(this.estabelecimentoSelecionado).subscribe(
      response => {
        this.mensagemSucesso = 'Estabelecimento deletado com sucesso!';
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Erro ao deletar o estabelecimento.'
    );
  }

  consultar() {
    if (!this.q || this.q.trim() === '') {
      this.ngOnInit();
      this.messagemErroBusca = '';
      return;
    }

    this.service.buscar(this.q).subscribe(
      resposta => {
        this.estabelecimentos = resposta;
        this.messagemErroBusca = this.estabelecimentos.length === 0
          ? 'Nenhum estabelecimento encontrado.'
          : '';
      }
    );
  }

  get estabelecimentosPaginados(): Estabelecimento[] {
    const inicio = (this.paginaAtual - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;
    return this.estabelecimentos.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.estabelecimentos.length / this.tamanhoPagina);
  }
}
