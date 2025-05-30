export class Produto {
    id?: number;
    nomeProduto?: string;
    marca?: string;
    municipioOrigem?: string;
    fabricante?: string;
    ativo?: string;
    foto?: string;
    datacadastro?: string;
    idUsuario?: number;
    usuario?: {
        id: number;
    };

    static toDTO(produto: Produto): any {
        return {
            id: produto.id,
            nomeProduto: produto.nomeProduto,
            marca: produto.marca,
            municipioOrigem: produto.municipioOrigem,
            fabricante: produto.fabricante,
            ativo: produto.ativo,
            foto: produto.foto,
            datacadastro: produto.datacadastro,
            idUsuario: produto.usuario?.id
        };
    }
}