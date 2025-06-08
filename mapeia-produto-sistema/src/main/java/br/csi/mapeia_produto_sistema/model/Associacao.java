package br.csi.mapeia_produto_sistema.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "Associacao")
@Table(name = "associacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Associacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fk_Usuario_idusuario", referencedColumnName = "idusuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "fk_Produto_idproduto", referencedColumnName = "idproduto", nullable = false)
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "fk_Estabelecimento_idest", referencedColumnName = "idestabelecimento", nullable = false)
    private Estabelecimento estabelecimento;

    @Column(name = "ativo", nullable = false, length = 1)
    private String ativo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "datacadastro")
    private Date datacadastro;
}