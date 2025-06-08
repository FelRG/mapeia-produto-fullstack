import { Component, OnInit } from '@angular/core';
import { Associacao } from '../associacoes';
import { Produto } from 'src/app/produtos/produto';
import { Estabelecimento } from 'src/app/estabelecimentos/estabelecimento';
import { Router } from '@angular/router';
import { AssociacoesService } from 'src/app/associacoes.service';
import { ProdutosService } from 'src/app/produtos.service';
import { EstabelecimentosService } from 'src/app/estabelecimentos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-associacoes-lista',
  templateUrl: './associacoes-lista.component.html',
  styleUrls: ['./associacoes-lista.component.css']
})
export class AssociacoesListaComponent implements OnInit {

  associacoes: Associacao[] = [];
  associacaoSelecionada!: Associacao;
  mensagemSucesso!: string;
  mensagemErro!: string;
  q!: string;
  messagemErroBusca!: string;

  constructor(
    private service: AssociacoesService,
    private produtosService: ProdutosService,
    private estabelecimentosService: EstabelecimentosService,
    private router: Router
  ) { }

  // ngOnInit(): void {
  //   this.service.getAssociacoes().subscribe(response => {
  //     this.associacoes = response;
  //   });
  // }

  ngOnInit(): void {
    forkJoin({
      associacoes: this.service.getAssociacoes(),
      produtos: this.produtosService.getProdutos(),
      estabelecimentos: this.estabelecimentosService.getEstabelecimentos()
    }).subscribe(({ associacoes, produtos, estabelecimentos }) => {
      // Mapear os nomes dentro de cada associação
      this.associacoes = associacoes.map(assoc => {
        const produto = produtos.find(p => p.id === assoc.produtoId);
        const estabelecimento = estabelecimentos.find(e => e.id === assoc.estabelecimentoId);
        return {
          ...assoc,
          produtoNome: produto ? produto.nomeProduto : 'Produto não encontrado',
          estabelecimentoNome: estabelecimento ? estabelecimento.nomeEstabelecimento : 'Estabelecimento não encontrado'
        };
      });
    });
  }

  novoCadastro() {
    this.router.navigate(['/associacoes/form']);
  }

  preparaDelecao(associacao: Associacao) {
    this.associacaoSelecionada = associacao;
  }

  deletarAssociacao() {
    this.service.deletar(this.associacaoSelecionada).subscribe(
      response => {
        this.mensagemSucesso = 'Associação deletada com sucesso!';
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Erro ao deletar a associação.'
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
        this.associacoes = resposta;
        this.messagemErroBusca = this.associacoes.length === 0
          ? 'Nenhuma associação encontrada.'
          : '';
      }
    );
  }

}
