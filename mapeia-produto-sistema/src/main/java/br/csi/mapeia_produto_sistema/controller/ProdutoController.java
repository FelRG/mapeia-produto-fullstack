package br.csi.mapeia_produto_sistema.controller;

import br.csi.mapeia_produto_sistema.dto.ProdutoDTO;
import br.csi.mapeia_produto_sistema.model.Estabelecimento;
import br.csi.mapeia_produto_sistema.model.Produto;
import br.csi.mapeia_produto_sistema.model.Usuario;
import br.csi.mapeia_produto_sistema.service.ProdutoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@RestController
@RequestMapping("/produto")
public class ProdutoController {

    private final ProdutoService produtoService;

    // Caminho fixo da pasta onde os arquivos serão salvos no backend
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

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
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro inesperado ao excluir produto.");
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Produto>> buscarProdutosPorNome(@RequestParam(value = "q", required = false, defaultValue = "") String termo) {
        List<Produto> produtos = produtoService.buscarPorNome(termo);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping(params = "limite")
    public ResponseEntity<List<Produto>> buscarPrimeiros(@RequestParam("limite") int limite) {
        List<Produto> produtos = produtoService.buscarPrimeiros(limite);
        return ResponseEntity.ok(produtos);
    }

    //rotas relacionadas ao upload de foto do produto

    @PostMapping("/upload")
    public ResponseEntity<Produto> criarProdutoComImagem(
            @RequestPart("produto") ProdutoDTO dto,
            @RequestPart("imagem") MultipartFile imagem) {

        try {
            // Salvar imagem no disco
            String caminhoImagem = salvarImagem(imagem);
            dto.setFoto(caminhoImagem); // Define o caminho salvo no DTO

            Produto novoProduto = produtoService.salvarProduto(dto);
            return ResponseEntity.ok(novoProduto);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/upload/{id}")
    public ResponseEntity<Produto> atualizarProdutoComImagem(
            @PathVariable Long id,
            @RequestPart("produto") ProdutoDTO dto,
            @RequestPart(name = "imagem", required = false) MultipartFile imagem) {

        try {
            if (imagem != null && !imagem.isEmpty()) {
                String caminhoImagem = salvarImagem(imagem);
                dto.setFoto(caminhoImagem);
            }

            Produto atualizado = produtoService.atualizarProduto(id, dto);
            return ResponseEntity.ok(atualizado);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private String salvarImagem(MultipartFile imagem) throws IOException {
        // Cria o diretório se não existir
        Path diretorio = Paths.get(uploadDir);
        if (!Files.exists(diretorio)) {
            Files.createDirectories(diretorio);
        }

        // Gera um nome único para evitar sobrescrever arquivos
        String nomeArquivo = System.currentTimeMillis() + "_" + imagem.getOriginalFilename();
        Path caminhoCompleto = diretorio.resolve(nomeArquivo);

        // Salva o arquivo no disco
        imagem.transferTo(caminhoCompleto.toFile());

        // Retorna o caminho relativo para armazenar no banco
        return "/uploads/" + nomeArquivo;
    }
}
