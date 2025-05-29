package br.csi.mapeia_produto_sistema.repository;

import br.csi.mapeia_produto_sistema.model.Associacao;
import br.csi.mapeia_produto_sistema.model.AssociacaoId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssociacaoRepository extends JpaRepository<Associacao, AssociacaoId> {
}
