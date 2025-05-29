package br.csi.mapeia_produto_sistema.model;

import java.io.Serializable;
import java.util.Objects;

public class AssociacaoId implements Serializable {

    private Long usuario;
    private Long produto;
    private Long estabelecimento;

    public AssociacaoId() {}

    public AssociacaoId(Long usuario, Long produto, Long estabelecimento) {
        this.usuario = usuario;
        this.produto = produto;
        this.estabelecimento = estabelecimento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AssociacaoId that)) return false;
        return Objects.equals(usuario, that.usuario) &&
                Objects.equals(produto, that.produto) &&
                Objects.equals(estabelecimento, that.estabelecimento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuario, produto, estabelecimento);
    }
}
