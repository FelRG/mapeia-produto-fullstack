package br.csi.mapeia_produto_sistema.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "Estabelecimento")
@Table(name = "estabelecimento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Estabelecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idestabelecimento")
    private Long id;

    @NonNull
    @Column(name = "nomeestabelecimento", length = 100, nullable = false)
    private String nomeEstabelecimento;

    @NonNull
    @Column(name = "endereco", length = 150, nullable = false)
    private String endereco;

    @NonNull
    @Column(name = "numero", length = 10, nullable = false)
    private String numero;

    @NonNull
    @Column(name = "estado", length = 2, nullable = false)
    private String estado;

    @NonNull
    @Column(name = "categoria", length = 50, nullable = false)
    private String categoria;

    @NonNull
    @Column(name = "ativo", length = 1, nullable = false)
    private String ativo;

    @NonNull
    @Column(name = "cidade", length = 100, nullable = false)
    private String cidade;

    @Column(name = "complemento", length = 100)
    private String complemento;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "datacadastro")
    private Date datacadastro;

    @ManyToOne
    @JoinColumn(name = "fk_Usuario_idusuario", referencedColumnName = "idusuario")
    private Usuario usuario;
}

