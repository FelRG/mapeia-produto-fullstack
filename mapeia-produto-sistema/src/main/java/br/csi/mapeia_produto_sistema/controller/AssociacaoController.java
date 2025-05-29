package br.csi.mapeia_produto_sistema.controller;

import br.csi.mapeia_produto_sistema.dto.AssociacaoDTO;
import br.csi.mapeia_produto_sistema.service.AssociacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/associacao")
public class AssociacaoController {

    @Autowired
    private AssociacaoService associacaoService;

    // Criar nova associação
    @PostMapping
    public ResponseEntity<AssociacaoDTO> create(@RequestBody AssociacaoDTO dto) {
        AssociacaoDTO criada = associacaoService.create(dto);
        return ResponseEntity.ok(criada);
    }

    // Atualizar uma associação existente
    @PutMapping
    public ResponseEntity<AssociacaoDTO> update(@RequestBody AssociacaoDTO dto) {
        AssociacaoDTO atualizada = associacaoService.update(dto);
        return ResponseEntity.ok(atualizada);
    }

    // Buscar uma associação por ID composto
    @GetMapping("/{usuarioId}/{produtoId}/{estabelecimentoId}")
    public ResponseEntity<AssociacaoDTO> getById(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoId,
            @PathVariable Long estabelecimentoId
    ) {
        AssociacaoDTO dto = associacaoService.getById(usuarioId, produtoId, estabelecimentoId);
        return ResponseEntity.ok(dto);
    }

    // Buscar todas as associações
    @GetMapping
    public ResponseEntity<List<AssociacaoDTO>> getAll() {
        List<AssociacaoDTO> todas = associacaoService.getAll();
        return ResponseEntity.ok(todas);
    }

    // Deletar uma associação por ID composto
    @DeleteMapping("/{usuarioId}/{produtoId}/{estabelecimentoId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoId,
            @PathVariable Long estabelecimentoId
    ) {
        associacaoService.deleteById(usuarioId, produtoId, estabelecimentoId);
        return ResponseEntity.noContent().build();
    }
}
