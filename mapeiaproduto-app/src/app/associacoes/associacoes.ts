export class Associacao {
  id?: number;
  ativo?: string;
  datacadastro?: string;

  // IDs individuais
  usuarioId?: number;
  produtoId?: number;
  estabelecimentoId?: number;
  produtoNome?: string;
  estabelecimentoNome?: string;

  static toDTO(assoc: Associacao): any {
    return {
      id: assoc.id,
      ativo: assoc.ativo,
      datacadastro: assoc.datacadastro,
      usuarioId: assoc.usuarioId,
      produtoId: assoc.produtoId,
      estabelecimentoId: assoc.estabelecimentoId
    };
  }
}
