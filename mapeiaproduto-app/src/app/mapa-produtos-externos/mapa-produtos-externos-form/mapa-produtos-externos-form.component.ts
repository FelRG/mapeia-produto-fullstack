import { Component, ElementRef, OnInit, ViewChild, NgZone, HostListener } from '@angular/core';
import { ProdutosService } from '../../produtos.service'
import { AssociacoesService } from '../../associacoes.service';
import { EstabelecimentosService } from '../../estabelecimentos.service';
import { GeocodingService } from '../../geocoding.service';
import { Produto } from 'src/app/produtos/produto';
import { debounceTime, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-mapa-produtos-externos-form',
  templateUrl: './mapa-produtos-externos-form.component.html',
  styleUrls: ['./mapa-produtos-externos-form.component.css']
})
export class MapaProdutosExternosFormComponent implements OnInit {
  @ViewChild('mapa', { static: true }) mapaElemento!: ElementRef;
  nomeProduto: string = '';
  map!: google.maps.Map;

  // Produto (busca com chip)
  @ViewChild('autocompleteProdutoContainer') autocompleteProdutoContainer!: ElementRef;
  mostrarSugestoesProduto: boolean = false;
  produtoInput: string = '';
  produtosFiltrados: Produto[] = [];
  private buscaProdutoSubject = new Subject<string>();
  produtoSelecionado: Produto | null = null; // Variável para funcionalidade do chip

  constructor(
    private produtoService: ProdutosService,
    private associacoesService: AssociacoesService,
    private estabelecimentoService: EstabelecimentosService,
    private geocodingService: GeocodingService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.initMap();

    // Setup da busca de produtos com debounce
    this.buscaProdutoSubject.pipe(
      debounceTime(300),
      switchMap((termo: string) => {
        if (termo.length < 3) return [];
        return this.produtoService.buscar(termo); // precisa ter esse método no serviço
      })
    ).subscribe((resultados: Produto[]) => {
      this.produtosFiltrados = resultados;
    });
  }

  initMap(): void {
    this.map = new google.maps.Map(this.mapaElemento.nativeElement, {
      center: { lat: -23.55052, lng: -46.633308 }, // São Paulo como exemplo
      zoom: 12,
    });
  }

  buscarProduto(): void {

    if (!this.nomeProduto.trim()) {
      this.initMap(); // Reseta o mapa para o estado inicial
      return;
    }

    this.produtoService.buscar(this.nomeProduto).subscribe(produtos => {
      if (produtos.length === 0) {
        alert('Produto não encontrado.');
        return;
      }

      const produtosLimitados = produtos.slice(0, 7);
      const bounds = new google.maps.LatLngBounds();
      let markerCount = 0;

      produtosLimitados.forEach(produto => {
        this.associacoesService.buscarPorProduto(produto.id!).subscribe(associacoes => {
          if (associacoes.length === 0) {
            console.warn(`Nenhuma associação encontrada para o produto ${produto.nomeProduto}`);
            return;
          }

          const associacoesLimitadas = associacoes.slice(0, 7);

          associacoesLimitadas.forEach(assoc => {
            this.estabelecimentoService.getEstabelecimentoById(assoc.estabelecimentoId!).subscribe(est => {
              const complemento = est.complemento ? `, ${est.complemento}` : '';
              const enderecoCompleto = `${est.endereco}, ${est.numero}, ${est.cidade}, ${est.estado}${complemento}, Brasil`;

              this.geocodingService.geocodeAddress(enderecoCompleto).then(coordenadas => {
                if (!coordenadas) return;

                const marker = new google.maps.Marker({
                  position: coordenadas,
                  map: this.map,
                  title: est.nomeEstabelecimento,
                });

                bounds.extend(coordenadas);
                markerCount++;

                if (markerCount === 1) {
                  // Se for só 1 marcador, centraliza e coloca zoom padrão
                  this.map.setCenter(coordenadas);
                  this.map.setZoom(20);
                } else {
                  // Ajusta os limites para incluir todos os marcadores
                  this.map.fitBounds(bounds);
                }

                // const infoWindow = new google.maps.InfoWindow({
                //   content: `<strong>${est.nomeEstabelecimento}</strong><br/>Produto: ${produto.nomeProduto}`,
                // });

                const infoWindow = new google.maps.InfoWindow({
                  content: `
                    <div style="cursor: pointer;">
                      <a href="/mapa-produtos-externos/descricao/${assoc.id}" style="text-decoration: none; color: inherit;">
                        <strong>${est.nomeEstabelecimento}</strong><br/>
                        Produto: ${produto.nomeProduto}<br/>
                        <em style="color: blue;">Clique para ver mais</em>
                      </a>
                    </div>
                  `,
                });


                marker.addListener('click', () => {
                  infoWindow.open(this.map, marker);
                });
              }).catch(err => {
                console.error('Erro ao geocodificar endereço:', enderecoCompleto, err);
              });
            });
          });
        });
      });
    });
  }

  // Método para buscar produtos com debounce
  buscarProdutos(termo: string): void {
    if (!termo || termo.trim().length < 3) {
      this.carregarProdutosIniciais();
      return;
    }
    this.buscaProdutoSubject.next(termo);
    this.mostrarSugestoesProduto = true;
  }

  selecionarProduto(prod: Produto): void {
    this.produtoSelecionado = prod;
    this.nomeProduto = prod.nomeProduto ?? '';
    this.produtosFiltrados = [];
    this.mostrarSugestoesProduto = false;
  }

  removerProdutoSelecionado(): void {
    this.produtoSelecionado = null;
    this.nomeProduto = '';
  }

  carregarProdutosIniciais(): void {
    this.produtoService.buscarPrimeiros(10).subscribe((resultados: Produto[]) => {
      this.produtosFiltrados = resultados;
    });
  }

  @HostListener('document:click', ['$event'])
  onClickFora(event: MouseEvent): void {
    if (!this.autocompleteProdutoContainer.nativeElement.contains(event.target)) {
      this.mostrarSugestoesProduto = false;
      this.produtosFiltrados = [];
    }
  }

  aoFocarCampoProduto(): void {
    this.mostrarSugestoesProduto = true;

    // Somente busca os primeiros se o campo estiver vazio ou com poucos caracteres
    if (!this.produtoInput || this.produtoInput.trim().length < 3) {
      this.carregarProdutosIniciais();
    }
  }



}
