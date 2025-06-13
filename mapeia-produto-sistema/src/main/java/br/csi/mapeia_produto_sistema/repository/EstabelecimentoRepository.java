package br.csi.mapeia_produto_sistema.repository;

import br.csi.mapeia_produto_sistema.model.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, Long> {
    List<Estabelecimento> findByNomeEstabelecimentoContainingIgnoreCase(String nome);
    @Query(value = "SELECT * FROM estabelecimento ORDER BY nomeestabelecimento ASC LIMIT :limite", nativeQuery = true)
    List<Estabelecimento> findTopN(@Param("limite") int limite);

}
