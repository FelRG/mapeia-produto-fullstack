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
    @PutMapping("/{id}")
    public ResponseEntity<AssociacaoDTO> update(
            @PathVariable Long id,
            @RequestBody AssociacaoDTO dto) {
        dto.setId(id); // garante que o ID está no DTO
        AssociacaoDTO atualizada = associacaoService.update(dto);
        return ResponseEntity.ok(atualizada);
    }

    // Buscar uma associação por ID simples
    @GetMapping("/{id}")
    public ResponseEntity<AssociacaoDTO> getById(@PathVariable Long id) {
        AssociacaoDTO dto = associacaoService.getById(id);
        return ResponseEntity.ok(dto);
    }

    // Buscar todas as associações
    @GetMapping
    public ResponseEntity<List<AssociacaoDTO>> getAll() {
        List<AssociacaoDTO> todas = associacaoService.getAll();
        return ResponseEntity.ok(todas);
    }

    // Deletar uma associação por ID simples
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        associacaoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar associações por ID de produto
    @GetMapping("/produto/{produtoId}")
    public ResponseEntity<List<AssociacaoDTO>> getByProdutoId(@PathVariable Long produtoId) {
        List<AssociacaoDTO> associacoes = associacaoService.getByProdutoId(produtoId);
        return ResponseEntity.ok(associacoes);
    }

}

