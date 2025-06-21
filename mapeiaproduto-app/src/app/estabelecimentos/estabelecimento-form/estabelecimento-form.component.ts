import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from '../estabelecimento';
import { EstabelecimentosService } from '../../estabelecimentos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estabelecimento-form',
  templateUrl: './estabelecimento-form.component.html',
  styleUrls: ['./estabelecimento-form.component.css']
})
export class EstabelecimentoFormComponent implements OnInit {

  estabelecimento: Estabelecimento;
  sucesso!: boolean;
  erro!: boolean;
  erroUsuarioInvalido: boolean = false;
  idUsuario: number = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')!) : 0;
  id!: number;

  isAdmin?: boolean;
  contaAtualPermissao: string = localStorage.getItem('tipoPermissao') || '';

  cidades: string[] = [
    'Agudo', 'Cacequi', 'Cachoeira do Sul', 'Capão do Cipó', 'Cerro Branco',
    'Dilermando de Aguiar', 'Dona Francisca', 'Faxinal do Soturno', 'Itaara', 'Ivorá',
    'Jaguari', 'Júlio de Castilhos', 'Mata', 'Nova Esperança do Sul', 'Nova Palma',
    'Novo Cabrais', 'Paraíso do Sul', 'Santa Maria', 'Santiago', 'São Francisco de Assis',
    'São João do Polêsine', 'São Martinho da Serra', 'São Sepé', 'São Vicente do Sul',
    'Silveira Martins', 'Unistalda'
  ];



  constructor(
    private service: EstabelecimentosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.estabelecimento = new Estabelecimento();
    // this.estabelecimento.idUsuario = this.idUsuario;
    this.estabelecimento.ativo = 'S'; // Define ativo como 'S' por padrão
    this.estabelecimento.cidade = ''; // Inicializa cidade como string vazia
    this.estabelecimento.estado = ''; // Inicializa estado como string vazia
  }

  ngOnInit(): void {
    this.isAdmin = this.contaAtualPermissao === 'Admin';
    this.activatedRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.id = params['id'];
        this.service.getEstabelecimentoById(this.id).subscribe(
          (response) => {
            this.estabelecimento = response;
            // this.estabelecimento.idUsuario = response.idUsuario;
            console.log(this.estabelecimento);
          },
          (errorResponse) => {
            this.estabelecimento = new Estabelecimento();
          }
        );
      }
    });
  }

  onSubmit(): void {
    console.log(this.estabelecimento);
    if (!this.estabelecimento.estado || !this.estabelecimento.cidade) {
      alert("Por favor, selecione um estado e uma cidade.");
      return;
    }

    // console.log(this.estabelecimento);
    // console.log(this.idUsuario);

    if (this.idUsuario === 0) {
      this.erroUsuarioInvalido = true;
      this.sucesso = false;
      return;
    }

    // this.estabelecimento.idUsuario = this.idUsuario;
    this.erroUsuarioInvalido = false;

    if (this.id) {
      // this.estabelecimento.idUsuario = this.estabelecimento.usuario?.id
      const dto = Estabelecimento.toDTO(this.estabelecimento);
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
      this.estabelecimento.idUsuario = this.idUsuario;
      this.service.salvar(this.estabelecimento).subscribe(
        (response) => {
          this.estabelecimento = response;
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
