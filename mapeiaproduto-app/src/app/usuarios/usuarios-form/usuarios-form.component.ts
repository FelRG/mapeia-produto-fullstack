import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../usuario';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],
})
export class UsuariosFormComponent implements OnInit {
  usuario: Usuario;
  sucess: boolean = false;
  // errors: String[];
  id!: number;

  constructor(
    private service: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = new Usuario();
  }

  // ngOnInit(): void {
  //   let params = this.activatedRoute.params
  //   if(params && params.value && params.value.id){
  //     this.id = params.value.id;
  //     this.service.getUsuarioById(this.id)
  //     .subscribe(
  //       response => this.usuario = response,
  //       errorResponse => this.usuario = new Usuario()
  //     );
  //   }
  // }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe((params: Params) => {
  //     this.id = params['id'];

  //     if (this.id) {
  //       this.service.getUsuarioById(this.id).subscribe(
  //         response => {
  //           this.usuario = response;
  //         },
  //         error => {
  //           this.usuario = new Usuario();
  //         }
  //       );
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.service.getUsuarioById(this.id).subscribe(
          (response) => (this.usuario = response),
          (errorResponse) => (this.usuario = new Usuario())
        );
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/usuarios/lista']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.usuario).subscribe(
        (response) => {
          this.sucess = true;
          // this.errors = null;
        }
        // , errorResponse => {
        //   this.sucess = false;
        //   this.errors = ['Erro ao atualizar o usuário.'];
        // }
      );
    } else {
      this.service.salvar(this.usuario).subscribe(
        (response) => {
          this.sucess = true;
          // this.errors = null;
          this.usuario = response;
        }
        // , errorResponse => {
        //   this.sucess = false;
        //   this.errors = errorResponse.error.errors;
        // }
      );
    }
  }
}
