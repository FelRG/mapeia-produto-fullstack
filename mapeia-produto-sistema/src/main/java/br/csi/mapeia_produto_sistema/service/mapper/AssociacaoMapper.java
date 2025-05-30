package br.csi.mapeia_produto_sistema.service.mapper;

import br.csi.mapeia_produto_sistema.dto.AssociacaoDTO;
import br.csi.mapeia_produto_sistema.model.Associacao;
import br.csi.mapeia_produto_sistema.model.Estabelecimento;
import br.csi.mapeia_produto_sistema.model.Produto;
import br.csi.mapeia_produto_sistema.model.Usuario;

public class AssociacaoMapper {

    public static Associacao toEntity(AssociacaoDTO dto, Usuario usuario, Produto produto, Estabelecimento estabelecimento) {
        Associacao a = new Associacao();
        a.setUsuario(usuario);
        a.setProduto(produto);
        a.setEstabelecimento(estabelecimento);
        a.setAtivo(dto.getAtivo());
        a.setDatacadastro(dto.getDatacadastro());
        return a;
    }

    public static AssociacaoDTO toDTO(Associacao a) {
        return AssociacaoDTO.builder()
                .usuarioId(a.getUsuario().getId())
                .produtoId(a.getProduto().getId())
                .estabelecimentoId(a.getEstabelecimento().getId())
                .ativo(a.getAtivo())
                .datacadastro(a.getDatacadastro())
                .build();
    }
}

