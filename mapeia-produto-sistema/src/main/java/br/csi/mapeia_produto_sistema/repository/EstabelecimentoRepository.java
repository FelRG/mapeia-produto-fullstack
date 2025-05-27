package br.csi.mapeia_produto_sistema.repository;

import br.csi.mapeia_produto_sistema.model.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, Long> {
    List<Estabelecimento> findByNomeEstabelecimentoContainingIgnoreCase(String nome);
}
