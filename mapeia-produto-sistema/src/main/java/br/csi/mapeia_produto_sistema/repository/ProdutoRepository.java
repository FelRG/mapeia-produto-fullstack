package br.csi.mapeia_produto_sistema.repository;

import br.csi.mapeia_produto_sistema.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeProdutoContainingIgnoreCase(String nome);
}
