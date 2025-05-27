package br.csi.mapeia_produto_sistema.repository;

import br.csi.mapeia_produto_sistema.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<Usuario> findByNomeUsuarioContainingIgnoreCase(String nome);
    Usuario findByEmail(String email);
    boolean existsByEmail(String email);
}
