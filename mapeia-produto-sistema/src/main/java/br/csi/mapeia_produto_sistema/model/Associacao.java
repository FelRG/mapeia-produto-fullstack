package br.csi.mapeia_produto_sistema.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "associacao")
@IdClass(AssociacaoId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Associacao {

    @Id
    @ManyToOne
    @JoinColumn(name = "fk_Usuario_idusuario", referencedColumnName = "idusuario")
    private Usuario usuario;

    @Id
    @ManyToOne
    @JoinColumn(name = "fk_Produto_idproduto", referencedColumnName = "idproduto")
    private Produto produto;

    @Id
    @ManyToOne
    @JoinColumn(name = "fk_Estabelecimento_idest", referencedColumnName = "idestabelecimento")
    private Estabelecimento estabelecimento;

    @Column(name = "ativo", nullable = false, length = 1)
    private String ativo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "datacadastro")
    private Date datacadastro;
}

