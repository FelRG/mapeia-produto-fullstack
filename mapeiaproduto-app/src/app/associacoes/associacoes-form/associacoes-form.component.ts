import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Estabelecimento } from 'src/app/estabelecimentos/estabelecimento';
import { EstabelecimentosService } from 'src/app/estabelecimentos.service';
import { Produto } from 'src/app/produtos/produto';
import { ProdutosService } from 'src/app/produtos.service';
import { Associacao } from '../associacoes';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociacoesService } from 'src/app/associacoes.service';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-associacoes-form',
  templateUrl: './associacoes-form.component.html',
  styleUrls: ['./associacoes-form.component.css']
})
export class AssociacoesFormComponent implements OnInit {

  // Carregar as informações de Estabelecimento, Produto, Usuario e Associacao
  // para o formulário de associação
  associacao: Associacao;
  estabelecimentos: Estabelecimento[] = [];
  produtos: Produto[] = [];
  idUsuario: number = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')!) : 0;

  // Variáveis para controle de estado do formulário
  sucesso!: boolean;
  erro!: boolean;
  erroUsuarioInvalido: boolean = false;
  id!: number;
  isEditMode: boolean = false;


  // Variáveis para busca de estabelecimentos
  @ViewChild('autocompleteContainer') autocompleteContainer!: ElementRef;
  mostrarSugestoes: boolean = false;
  estabelecimentoInput: string = '';
  estabelecimentosFiltrados: Estabelecimento[] = [];
  private buscaEstabelecimentoSubject = new Subject<string>();


  constructor(
    private service: AssociacoesService,
    private estabelecimentosService: EstabelecimentosService,
    private produtosService: ProdutosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.associacao = new Associacao();
    this.associacao.ativo = 'S'; // Define ativo como 'S' por padrão
    this.associacao.estabelecimentoId = 0; // Inicializa estabelecimentoId como 0
    this.associacao.produtoId = 0; // Inicializa produtoId como 0
  }

  ngOnInit(): void {
    // this.estabelecimentosService.getEstabelecimentos().subscribe(response => {
    //   this.estabelecimentos = response;
    // });

    // Setup da busca com debounce
    this.buscaEstabelecimentoSubject.pipe(
      debounceTime(300),
      // distinctUntilChanged(),
      switchMap((termo: string) => {
        if (termo.length < 3) return [];
        return this.estabelecimentosService.buscar(termo);
      })
    ).subscribe((resultados: Estabelecimento[]) => {
      this.estabelecimentosFiltrados = resultados;
    });

    // Busca estática de produtos
    this.produtosService.getProdutos().subscribe(response => {
      this.produtos = response;
    });
    this.activatedRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.id = params['id'];
        this.isEditMode = true;  // ativa modo edição
        this.service.getAssociacaoById(this.id).subscribe(
          (response) => {
            this.associacao = response;
            if (this.associacao.estabelecimentoId) {
              this.estabelecimentosService.getEstabelecimentoById(this.associacao.estabelecimentoId).subscribe(est => {
                this.estabelecimentoInput = est.nomeEstabelecimento ?? '';
              });
            }
            // this.associacao.idUsuario = response.idUsuario;
            // console.log(this.associacao);
          },
          (errorResponse) => {
            this.associacao = new Associacao();
            this.isEditMode = false;
          }
        );
      }
    });
  }

  // Chamado a cada mudança de input
  buscarEstabelecimentos(termo: string): void {
    if (!termo || termo.trim().length < 3) {
      // this.estabelecimentosFiltrados = []; // limpa a lista
      this.carregarEstabelecimentosIniciais();
      return;
    }

    this.buscaEstabelecimentoSubject.next(termo);
    this.mostrarSugestoes = true;
  }


  // Quando seleciona um estabelecimento
  selecionarEstabelecimento(estabelecimento: Estabelecimento): void {
    this.associacao.estabelecimentoId = estabelecimento.id;
    this.estabelecimentoInput = estabelecimento.nomeEstabelecimento ?? '';
    this.estabelecimentosFiltrados = [];
  }

  carregarEstabelecimentosIniciais(): void {
    // Busca os primeiros 10 estabelecimentos, por exemplo
    this.estabelecimentosService.buscarPrimeiros(10).subscribe((resultados: Estabelecimento[]) => {
      this.estabelecimentosFiltrados = resultados;
    });
  }

  @HostListener('document:click', ['$event'])
  onClickFora(event: MouseEvent): void {
    if (!this.autocompleteContainer.nativeElement.contains(event.target)) {
      this.mostrarSugestoes = false;
      this.estabelecimentosFiltrados = []; // limpa a lista
    }
  }

  aoFocarCampoEstabelecimento(): void {
    this.mostrarSugestoes = true;

    // Somente busca os primeiros se o campo estiver vazio ou com poucos caracteres
    if (!this.estabelecimentoInput || this.estabelecimentoInput.trim().length < 3) {
      this.carregarEstabelecimentosIniciais();
    }
  }



  onSubmit(): void {
    console.log(this.associacao);
    if (!this.associacao.estabelecimentoId || !this.associacao.produtoId) {
      alert("Por favor, selecione um Estabelecimento e um Produto.");
      return;
    }

    // console.log(this.associacao);
    // console.log(this.idUsuario);

    if (this.idUsuario === 0) {
      this.erroUsuarioInvalido = true;
      this.sucesso = false;
      return;
    }

    // this.associacao.idUsuario = this.idUsuario;
    this.erroUsuarioInvalido = false;

    if (this.id) {
      // this.associacao.idUsuario = this.associacao.usuario?.id      
      const dto = Associacao.toDTO(this.associacao);
      this.service.atualizar(dto).subscribe(
        (response) => {
          this.sucesso = true;
          this.erro = false;
        },
        (errorResponse) => {
          this.sucesso = false;
          this.erro = true;
        }
      );
    } else {
      this.associacao.usuarioId = this.idUsuario;
      this.service.salvar(this.associacao).subscribe(
        (response) => {
          this.associacao = response;
          this.sucesso = true;
          this.erro = false;
        },
        (errorResponse) => {
          this.sucesso = false;
          this.erro = true;
        }
      );
    }
  }

}
