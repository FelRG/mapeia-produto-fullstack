import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AssociacoesService } from '../../associacoes.service';
import { ProdutosService } from '../../produtos.service';
import { EstabelecimentosService } from '../../estabelecimentos.service';
import { UsuariosService } from '../../usuarios.service'; // supondo que você tenha esse service

@Component({
  selector: 'app-mapa-produtos-descricao',
  templateUrl: './mapa-produtos-descricao.component.html',
  styleUrls: ['./mapa-produtos-descricao.component.css']
})
export class MapaProdutosDescricaoComponent implements OnInit {
  idAssociacao!: number;

  produto: any;
  estabelecimento: any;
  usuario: any;

  constructor(
    private route: ActivatedRoute,
    private associacoesService: AssociacoesService,
    private produtosService: ProdutosService,
    private estabelecimentosService: EstabelecimentosService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
  this.idAssociacao = Number(this.route.snapshot.paramMap.get('id'));

  this.associacoesService.getAssociacaoById(this.idAssociacao).subscribe(associacao => {
    if (!associacao || !associacao.produtoId || !associacao.estabelecimentoId || !associacao.usuarioId) {
      alert('Dados incompletos na associação.');
      return;
    }

    const { produtoId, estabelecimentoId, usuarioId } = associacao;

    forkJoin({
      produto: this.produtosService.getProdutoById(produtoId),
      estabelecimento: this.estabelecimentosService.getEstabelecimentoById(estabelecimentoId),
      usuario: this.usuariosService.getUsuarioById(usuarioId)
    }).subscribe(({ produto, estabelecimento, usuario }) => {
      this.produto = produto;
      this.estabelecimento = estabelecimento;
      this.usuario = usuario;
    });
  });
}

}
