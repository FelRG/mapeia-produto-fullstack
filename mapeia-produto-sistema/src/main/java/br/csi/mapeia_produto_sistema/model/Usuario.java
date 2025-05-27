package br.csi.mapeia_produto_sistema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Entity(name = "Usuario")
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuario")
    private Long id;

    @NonNull
    @NotBlank
    @NotEmpty(message = "O campo nome é obrigatório")
    @Size(max = 100, message = "Nome de usuário com no máximo 100 caracteres")
    @Column(name = "nomeusuario", length = 100, nullable = false)
    private String nomeUsuario;

    @NonNull
    @NotBlank
    @NotEmpty(message = "O campo email é obrigatório")
    @Size(max = 100, message = "Email com no máximo 100 caracteres")
    @Email(message = "Email inválido")
    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email;

    @NonNull
    @NotBlank
    @NotEmpty(message = "O campo telefone é obrigatório")
    @Column(name = "telefone", length = 50)
    @Size(max = 50, message = "Telefone com no máximo 50 caracteres")
    private String telefone;

    @NonNull
    @NotBlank
    @NotEmpty(message = "O campo senha é obrigatório")
    @Size(max = 100, message = "Senha com no máximo 100 caracteres")
    @Column(name = "senha", length = 100, nullable = false)
    private String senha;

    @NonNull
    @NotBlank
    @NotEmpty(message = "O campo tipo de conta é obrigatório")
    @Size(max = 50, message = "Tipo de permissao com no máximo 50 caracteres")
    @Column(name = "tipopermissao", length = 50, nullable = false)
    private String tipoPermissao;

    @NonNull
    @NotBlank
    @Size(max = 1, message = "Ativo com no máximo 1 caracter")
    @Column(name = "ativo", length = 1, nullable = false)
    private String ativo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "datacadastro")
    private Date datacadastro;
}
