package br.csi.mapeia_produto_sistema.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class EstabelecimentoDTO {
    private Long id;
    private String nomeEstabelecimento;
    private String endereco;
    private String numero;
    private String estado;
    private String categoria;
    private String ativo;
    private String cidade;
    private String complemento;
    private Date datacadastro;
    private Long idUsuario;
}
