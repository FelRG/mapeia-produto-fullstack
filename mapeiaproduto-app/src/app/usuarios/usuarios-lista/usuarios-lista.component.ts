import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../usuario';
import { UsuariosService } from '../../usuarios.service';
import { UsuariosBusca } from './usuariosBusca';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuarioSelecionado!: Usuario;
  mensagemSucesso!: string;
  mensagemErro!: string;
  q!: string;
  // lista!: UsuariosBusca[];
  messagemErroBusca!: string;
  contaAtualId: number = Number(localStorage.getItem('id')) || 0;

  paginaAtual: number = 1;
  tamanhoPagina: number = 5;



  constructor(
    private service: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.getUsuarios().subscribe(resposta => this.usuarios = resposta);
  }

  novoCadastro() {
    this.router.navigate(['/usuarios/form']);
  }

  preparaDelecao(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
  }

  deletarUsuario() {
    console.log(this.usuarioSelecionado);
    this.service.deletar(this.usuarioSelecionado).subscribe(
      response => {
        this.mensagemSucesso = 'Usuario deletado com sucesso!'
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o usuario. '
    )
  }

  consultar() {
    if (this.q == undefined || this.q == null || this.q.trim() == '') {
      this.ngOnInit();
      this.messagemErroBusca = '';
      return;
    }
    // this.service.buscar(this.q).subscribe(response => this.lista = response);
    this.service.buscar(this.q)
      .subscribe(
        response => {
          this.usuarios = response
          if (this.usuarios.length <= 0) {
            this.messagemErroBusca = 'Nenhum usuario encontrado com esse nome.';
          } else {
            this.messagemErroBusca = '';
          }
        },
      );
  }

  get usuariosPaginados(): Usuario[] {
    const inicio = (this.paginaAtual - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;
    return this.usuarios.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.usuarios.length / this.tamanhoPagina);
  }

}
