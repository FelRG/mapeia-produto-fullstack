package br.csi.mapeia_produto_sistema.repository;

import br.csi.mapeia_produto_sistema.model.Estabelecimento;
import br.csi.mapeia_produto_sistema.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeProdutoContainingIgnoreCase(String nome);
    @Query(value = "SELECT * FROM produto ORDER BY nomeproduto ASC LIMIT :limite", nativeQuery = true)
    List<Produto> findTopN(@Param("limite") int limite);
}
