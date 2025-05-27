package br.csi.mapeia_produto_sistema.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ProdutoDTO {
    private Long id;
    private String nomeProduto;
    private String marca;
    private String municipioOrigem;
    private String fabricante;
    private String ativo;
    private String foto;
    private Date datacadastro;
    private Long idUsuario;
}
