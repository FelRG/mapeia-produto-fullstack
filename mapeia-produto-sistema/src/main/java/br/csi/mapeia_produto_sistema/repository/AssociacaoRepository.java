package br.csi.mapeia_produto_sistema.repository;

import br.csi.mapeia_produto_sistema.dto.AssociacaoDTO;
import br.csi.mapeia_produto_sistema.model.Associacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Arrays;
import java.util.List;

public interface AssociacaoRepository extends JpaRepository<Associacao, Long> {
    List<Associacao> findByProdutoId(Long produtoId);
    @Query("""
    SELECT a FROM Associacao a
    JOIN Estabelecimento e ON e.id = a.estabelecimento.id
    JOIN Produto p ON p.id = a.produto.id
    WHERE LOWER(e.nomeEstabelecimento) LIKE LOWER(CONCAT('%', :nome, '%'))
       OR LOWER(p.nomeProduto) LIKE LOWER(CONCAT('%', :nome, '%'))
    """)
    List<Associacao> buscarPorNomeEstabelecimentoOuProduto(@Param("nome") String nome);
}
