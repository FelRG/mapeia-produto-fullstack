package br.csi.mapeia_produto_sistema.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssociacaoDTO {

    private Long id; // novo campo de identificação primária

    private Long usuarioId;
    private Long produtoId;
    private Long estabelecimentoId;

    private String ativo;
    private Date datacadastro;

    private String nomeProduto;
    private String nomeEstabelecimento;
}
