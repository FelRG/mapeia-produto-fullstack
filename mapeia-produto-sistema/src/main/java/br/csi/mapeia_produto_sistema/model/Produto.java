package br.csi.mapeia_produto_sistema.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "Produto")
@Table(name = "produto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproduto")
    private Long id;

    @NonNull
    @Column(name = "nomeproduto", length = 100, nullable = false)
    private String nomeProduto;

    @NonNull
    @Column(name = "marca", length = 50, nullable = false)
    private String marca;

    @NonNull
    @Column(name = "municipiorigem", length = 100, nullable = false)
    private String municipioOrigem;

    @NonNull
    @Column(name = "fabricante", length = 100, nullable = false)
    private String fabricante;

    @NonNull
    @Column(name = "ativo", length = 1, nullable = false)
    private String ativo;

    @Column(name = "foto", columnDefinition = "TEXT")
    private String foto;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "datacadastro")
    private Date datacadastro;

    @ManyToOne
    @JoinColumn(name = "fk_Usuario_idusuario", referencedColumnName = "idusuario")
    private Usuario usuario;
}

