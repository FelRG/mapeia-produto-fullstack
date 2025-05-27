import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuarios/usuario';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // informações do usuário para cadastro
  nomeUsuario!: string;
  email!: string; // login
  telefone!: string;
  senha!: string; // login
  tipoPermissao!: string;
  mensagemSucesso!: string;
  // errors!: string[];

  loginError!: boolean;
  cadastrando!: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.tentarLogar(this.email, this.senha).subscribe(
      (response) => {
        // console.log(response.token);
        // const separadorToken = response.token;
        const token = JSON.stringify(response);
        localStorage.setItem('token', token);

        // Agora busca o usuário e salva no localStorage
        this.authService.getUsuarioAutenticado().subscribe(() => {
          this.router.navigate(['/home']); // ou qualquer rota pós-login
        });

        // this.router.navigate(['/home']);
      },
      (errorResponse) => {
        this.loginError = true;
        this.mensagemSucesso = '';
      }
    );
  }

  preparaCadastrar(event: MouseEvent) {
    event.preventDefault();
    this.cadastrando = true;
    this.loginError = false;
    this.mensagemSucesso = '';
  }

  cancelaCadastro() {
    this.cadastrando = false;
    this.loginError = false;
    this.mensagemSucesso = '';
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.nomeUsuario = this.nomeUsuario;
    usuario.email = this.email;
    usuario.telefone = this.telefone;
    usuario.senha = this.senha;
    usuario.tipoPermissao = this.tipoPermissao;
    usuario.ativo = 'S';
    this.authService.salvar(usuario).subscribe(
      (response) => {
        this.mensagemSucesso =
          'Cadastro realizado com sucesso! Efetue o login.';
        this.loginError = false;
        this.cadastrando = false;
        this.nomeUsuario = '';
        this.email = '';
        this.telefone = '';
        this.senha = '';
        this.tipoPermissao = '';
      },
      (errorResponse) => {
        this.loginError = true;
        this.mensagemSucesso = '';
        // this.errors = errorResponse.error.errors;
      }
    );
  }
}
