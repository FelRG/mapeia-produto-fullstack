import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tokenString = localStorage.getItem('token');

    const url = request.url;

    // if(tokenString && !url.endsWith('/login') ) {
    //   const token = JSON.parse(tokenString || '{}');
    //   const jwt = token.token;
    //   request = request.clone({
    //     setHeaders : {
    //       Authorization: 'Bearer ' + jwt
    //     }
    //   });
    // }

    const rotasPublicas = [
      // '/produto/buscar',
      // '/produto',
      // '/estabelecimento',
      // '/associacao/produto',
      // '/associacao'
      '/produto',
      '/estabelecimento',
      'associacao',
    ];

    // Verifica se a requisição é pública
    const isRotaPublica = rotasPublicas.some(publicUrl => url.includes(publicUrl));

    if (tokenString && !url.endsWith('/login') && !isRotaPublica) {
      const token = JSON.parse(tokenString || '{}');
      const jwt = token.token;
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt
        }
      });
    }


    return next.handle(request);
  }
}
