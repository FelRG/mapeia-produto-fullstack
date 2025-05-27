package br.csi.mapeia_produto_sistema.controller;

import br.csi.mapeia_produto_sistema.dto.EstabelecimentoDTO;
import br.csi.mapeia_produto_sistema.model.Estabelecimento;
import br.csi.mapeia_produto_sistema.service.EstabelecimentoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estabelecimento")
public class EstabelecimentoController {

    private final EstabelecimentoService estabelecimentoService;

    public EstabelecimentoController(EstabelecimentoService estabelecimentoService) {
        this.estabelecimentoService = estabelecimentoService;
    }

    // Criar estabelecimento com DTO
    @PostMapping
    public ResponseEntity<Estabelecimento> criarEstabelecimento(@RequestBody EstabelecimentoDTO dto) {
        Estabelecimento novo = estabelecimentoService.salvarEstabelecimento(dto);
        return ResponseEntity.ok(novo);
    }

    // Listar todos
    @GetMapping
    public ResponseEntity<List<Estabelecimento>> listarEstabelecimentos() {
        return ResponseEntity.ok(estabelecimentoService.listarEstabelecimentos());
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Estabelecimento est = estabelecimentoService.buscarEstabelecimentoPorId(id);
            return ResponseEntity.ok(est);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Atualizar por ID com DTO
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarEstabelecimento(@PathVariable Long id, @RequestBody EstabelecimentoDTO dto) {
        try {
            Estabelecimento atualizado = estabelecimentoService.atualizarEstabelecimento(id, dto);
            return ResponseEntity.ok(atualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarEstabelecimento(@PathVariable Long id) {
        try {
            estabelecimentoService.deletarEstabelecimento(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Buscar por nome (parametro ?q=)
    @GetMapping("/buscar")
    public ResponseEntity<List<Estabelecimento>> buscarPorNome(@RequestParam(value = "q", required = false, defaultValue = "") String termo) {
        List<Estabelecimento> estabelecimentos = estabelecimentoService.buscarPorNome(termo);
        return ResponseEntity.ok(estabelecimentos);
    }
}
