import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { ProdutosService } from '../../produtos.service'
import { AssociacoesService } from '../../associacoes.service';
import { EstabelecimentosService } from '../../estabelecimentos.service';
import { GeocodingService } from '../../geocoding.service';


@Component({
  selector: 'app-mapa-produtos-form',
  templateUrl: './mapa-produtos-form.component.html',
  styleUrls: ['./mapa-produtos-form.component.css']
})
export class MapaProdutosFormComponent implements OnInit {
  @ViewChild('mapa', { static: true }) mapaElemento!: ElementRef;
  nomeProduto: string = '';
  map!: google.maps.Map;

  constructor(
    private produtoService: ProdutosService,
    private associacoesService: AssociacoesService,
    private estabelecimentoService: EstabelecimentosService,
    private geocodingService: GeocodingService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.initMap();
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
                      <a href="/mapa-produtos/descricao/${assoc.id}" style="text-decoration: none; color: inherit;">
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




}
