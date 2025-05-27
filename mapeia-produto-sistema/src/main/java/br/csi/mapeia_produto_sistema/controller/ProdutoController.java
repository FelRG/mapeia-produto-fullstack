package br.csi.mapeia_produto_sistema.controller;

import br.csi.mapeia_produto_sistema.dto.ProdutoDTO;
import br.csi.mapeia_produto_sistema.model.Produto;
import br.csi.mapeia_produto_sistema.model.Usuario;
import br.csi.mapeia_produto_sistema.service.ProdutoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/produto")
public class ProdutoController {

    private final ProdutoService produtoService;

    // Construtor que injeta o serviço de produto
    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    // Criar produto
//    @PostMapping
//    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
//        Produto novoProduto = produtoService.salvarProduto(produto);
//        return ResponseEntity.ok(novoProduto);
//    }

    // Criar produto com DTO
    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody ProdutoDTO dto) {
        Produto novoProduto = produtoService.salvarProduto(dto);
        return ResponseEntity.ok(novoProduto);
    }

    // Listar todos os produtos
    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        return ResponseEntity.ok(produtoService.listarProdutos());
    }

    // Buscar produto por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Produto produto = produtoService.buscarProdutoPorId(id);
            return ResponseEntity.ok(produto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Atualizar produto
//    @PutMapping("/{id}")
//    public ResponseEntity<?> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
//        try {
//            Produto atualizado = produtoService.atualizarProduto(id, produtoAtualizado);
//            return ResponseEntity.ok(atualizado);
//        } catch (EntityNotFoundException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }

    // Atualizar produto com DTO
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarProduto(@PathVariable Long id, @RequestBody ProdutoDTO produtoAtualizadoDTO) {
        try {
            Produto atualizado = produtoService.atualizarProduto(id, produtoAtualizadoDTO);
            return ResponseEntity.ok(atualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar produto
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarProduto(@PathVariable Long id) {
        try {
            produtoService.deletarProduto(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Produto>> buscarUsuariosPorNome(@RequestParam(value = "q", required = false, defaultValue = "") String termo) {
        List<Produto> produtos = produtoService.buscarPorNome(termo);
        return ResponseEntity.ok(produtos);
    }
}
