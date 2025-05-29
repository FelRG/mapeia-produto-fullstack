import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  usuarioLogado?: string;
  permissao?: string;
  idusuario?: number;
  isAdmin?: boolean;
  isExterno?: boolean;

  usuarioSelecionado!: Usuario;
  mensagemSucesso!: string;
  mensagemErro!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private service: UsuariosService
  ) { }

  ngOnInit(): void {
    // this.usuarioLogado = this.authService.getUsuarioAutenticado();
    // this.permissao = this.authService.getPermissaoUsuarioAutenticado();
    // this.authService.getUsuarioAutenticado().subscribe((usuario) => {
    //   if (usuario) {
    //     this.idusuario = usuario.id;
    //     this.usuarioLogado = usuario.nomeUsuario;
    //     this.permissao = usuario.tipoPermissao;
    //     console.log('Usuário autenticado:', usuario);
    //   } else {
    //     console.log('Usuário não autenticado');
    //   }
    // });
    const usuario: Usuario = this.authService.getUsuarioLocal();
    if (usuario) {
      this.idusuario = usuario.id;
      this.usuarioLogado = usuario.nomeUsuario;
      this.permissao = usuario.tipoPermissao;
      this.isAdmin = this.permissao === 'Admin';
      this.isExterno = this.idusuario === undefined;
      console.log('Usuário carregado do localStorage:', usuario);
      console.log(this.isAdmin ? 'Usuário é Admin' : 'Usuário não é Admin');
    } else {
      console.log('Nenhum usuário no localStorage');
    }
  }

  logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

  preparaDelecao(usuarioid: number | undefined) {
    if (usuarioid === undefined) {
      this.mensagemErro = 'Usuário não selecionado para exclusão.';
      alert(this.mensagemErro);
      return;
    }
    this.usuarioSelecionado = {
      id: usuarioid!,
      nomeUsuario: '',
      email: '',
      telefone: '',
      senha: '',
      tipoPermissao: '',
      ativo: '',
      datacadastro: ''
    };
  }

  removerFoco() {
  setTimeout(() => {
    const el = document.activeElement as HTMLElement;
    if (el) el.blur();
  });
}


  deletarUsuario() {
    this.service.deletar(this.usuarioSelecionado).subscribe(
      response => {
        this.mensagemSucesso = 'Você excluiu sua conta com sucesso!';
        this.logout();
        alert(this.mensagemSucesso);
      },
      erro => {
        this.mensagemErro = 'Ocorreu um erro ao deletar a sua conta.'
        alert(this.mensagemErro);
      }
    )

    // Remove o foco para evitar warning de acessibilidade
    setTimeout(() => {
      const el = document.activeElement as HTMLElement;
      if (el) el.blur();
    });

  }
}
