export class Estabelecimento {
  id?: number;
  nomeEstabelecimento?: string;
  endereco?: string;
  numero?: string;
  estado?: string;
  categoria?: string;
  ativo?: string;
  cidade?: string;
  complemento?: string;
  datacadastro?: string;
  idUsuario?: number;
  usuario?: {
    id: number;
  };

  static toDTO(est: Estabelecimento): any {
    return {
      id: est.id,
      nomeEstabelecimento: est.nomeEstabelecimento,
      endereco: est.endereco,
      numero: est.numero,
      estado: est.estado,
      categoria: est.categoria,
      ativo: est.ativo,
      cidade: est.cidade,
      complemento: est.complemento,
      datacadastro: est.datacadastro,
      idUsuario: est.usuario?.id
    };
  }
}
