import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../usuarios/usuario';
import { UsuariosService } from '../../usuarios.service';

import { Produto } from '../produto';
import { ProdutosService } from '../../produtos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  // usuarios: Usuario[] = []
  // usuario!: Usuario;
  produto: Produto;
  sucess!: boolean;
  err!: boolean;
  id!: number;
  erroUsuarioInvalido: boolean = false;
  idUsuario: number = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')!) : 0;

  constructor(
    // private usuarioService: UsuariosService
    private service: ProdutosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.produto = new Produto();
    this.produto.idUsuario = this.idUsuario;
   }

  ngOnInit(): void {
    // this.usuarioService.getUsuarioById(1).subscribe( response => this.usuario = response)
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.service.getProdutoById(this.id).subscribe(
          (response) => {
            this.produto = response
            this.produto.idUsuario = this.idUsuario;
          },
          (errorResponse) => (this.produto = new Produto())
        );
      }
    });
  }

  onSubmit() {
    if (this.idUsuario === 0) {
      this.erroUsuarioInvalido = true;
      this.sucess = false;
      return; // Interrompe o cadastro/atualização
    }

    this.produto.idUsuario = this.idUsuario;
    this.erroUsuarioInvalido = false; // zera erro, se passar
    console.log(this.produto);

    if (this.id) {
      this.service.atualizar(this.produto).subscribe(
        (response) => {
          this.sucess = true;
          this.err = false;
    
        }, errorResponse => {
          this.sucess = false;
          this.err = true;
        }
      );
    } else {
      this.service.salvar(this.produto).subscribe(
        (response) => {
          this.sucess = true;
          this.err = false;
          this.produto = response;

        }, errorResponse => {
          this.sucess = false;
          this.err = true;
        }
      );
    }
  }

}
