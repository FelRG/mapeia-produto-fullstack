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

  isAdmin?: boolean;
  contaAtualPermissao: string = localStorage.getItem('tipoPermissao') || '';

  selectedFile?: File;
  imagemUrl?: string;


  constructor(
    // private usuarioService: UsuariosService
    private service: ProdutosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.produto = new Produto();
    // this.produto.idUsuario = this.idUsuario;
    this.produto.ativo = 'S'; // Define ativo como 'S' por padrão
  }

  ngOnInit(): void {
    this.isAdmin = this.contaAtualPermissao === 'Admin';
    // this.usuarioService.getUsuarioById(1).subscribe( response => this.usuario = response)
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.service.getProdutoById(this.id).subscribe(
          (response) => {
            this.produto = response
            if (this.produto.foto) {
              this.imagemUrl = this.service.getImagemUrl(this.produto.foto) + '?t=' + new Date().getTime();
              // this.imagemUrl = this.service.getImagemUrl(this.produto.foto);
              // this.produto.foto = this.service.getImagemUrl(this.produto.foto);
              // console.log(this.produto.foto);
            }
            // this.produto.idUsuario = this.idUsuario;
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

    // this.produto.idUsuario = this.idUsuario;
    this.erroUsuarioInvalido = false; // zera erro, se passar

    console.log('produto', this.produto);

    const formData = new FormData();

    const produtoPayload = Produto.toDTO(this.produto);

    // const produtoPayload = {
    //   ...this.produto
    // };

    if (!this.id) { // Se for criação (não tem ID ainda), atribui o usuário
      produtoPayload.idUsuario = this.idUsuario;
      console.log('Cadastrando novo produto com usuário:', this.idUsuario);
    }

    formData.append('produto', new Blob([JSON.stringify(produtoPayload)], {
      type: 'application/json'
    }));

    // formData.append('produto', new Blob([JSON.stringify({
    //   ...this.produto,
    //   idUsuario: this.idUsuario
    // })], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    if (this.id) {
      this.service.atualizarComImagem(this.id, formData).subscribe(
        (response) => {
          this.sucess = true;
          this.err = false;
          if (this.produto.foto) {
            this.imagemUrl = this.service.getImagemUrl(this.produto.foto) + '?t=' + new Date().getTime();
          }

        }, errorResponse => {
          this.sucess = false;
          this.err = true;
        }
      );
    } else {
      this.service.salvarComImagem(formData).subscribe(
        (response) => {
          this.sucess = true;
          this.err = false;
          if (this.produto.foto) {
            this.imagemUrl = this.service.getImagemUrl(this.produto.foto) + '?t=' + new Date().getTime();
          }

        }, errorResponse => {
          this.sucess = false;
          this.err = true;
        }
      );
    }

    // if (this.id) {
    //   const dto = Produto.toDTO(this.produto);
    //   this.service.atualizar(dto).subscribe(
    //     (response) => {
    //       this.sucess = true;
    //       this.err = false;

    //     }, errorResponse => {
    //       this.sucess = false;
    //       this.err = true;
    //     }
    //   );
    // } else {
    //   this.produto.idUsuario = this.idUsuario;
    //   this.service.salvar(this.produto).subscribe(
    //     (response) => {
    //       this.sucess = true;
    //       this.err = false;
    //       this.produto = response;

    //     }, errorResponse => {
    //       this.sucess = false;
    //       this.err = true;
    //     }
    //   );
    // }


  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

}
