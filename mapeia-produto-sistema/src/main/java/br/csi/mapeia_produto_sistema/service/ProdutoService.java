package br.csi.mapeia_produto_sistema.service;

import br.csi.mapeia_produto_sistema.dto.ProdutoDTO;
import br.csi.mapeia_produto_sistema.model.Produto;
import br.csi.mapeia_produto_sistema.repository.ProdutoRepository;
import br.csi.mapeia_produto_sistema.model.Usuario;
import br.csi.mapeia_produto_sistema.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;
    private final UsuarioRepository usuarioRepository;

    public ProdutoService(ProdutoRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    // Criar ou atualizar
//    public Produto salvarProduto(Produto produto) {
//        produto.setNomeProduto(produto.getNomeProduto().toUpperCase());
//
//        // Buscar o usuário completo pelo ID
//        Long usuarioId = produto.getUsuario().getId();
//        Usuario usuario = usuarioRepository.findById(usuarioId)
//                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + usuarioId));
//
//        produto.setUsuario(usuario); // associa o usuário completo
//        produto.setDatacadastro(new Date()); // define a data atual
//        return repository.save(produto);
//    }

    // Criar ou atualizar com DTO
    public Produto salvarProduto(ProdutoDTO produtoDTO) {

        Long idUsuario = produtoDTO.getIdUsuario();
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + idUsuario));

        Produto produto = new Produto();
        produto.setNomeProduto(produtoDTO.getNomeProduto().toUpperCase());
        produto.setMarca(produtoDTO.getMarca());
        produto.setMunicipioOrigem(produtoDTO.getMunicipioOrigem());
        produto.setFabricante(produtoDTO.getFabricante());
        produto.setAtivo(produtoDTO.getAtivo());
        produto.setFoto(produtoDTO.getFoto());
        produto.setDatacadastro(new Date());
        produto.setUsuario(usuario);
        return repository.save(produto);
    }

    // Buscar todos
    public List<Produto> listarProdutos() {
        return repository.findAll();
    }

    // Buscar por ID
    public Produto buscarProdutoPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com id: " + id));
    }

    // Atualizar por ID
//    public Produto atualizarProduto(Long id, Produto produtoAtualizado) {
//        Produto produto = buscarProdutoPorId(id);
//
//        // Deixa nome do produto em maiúsculo
//        produto.setNomeProduto(produtoAtualizado.getNomeProduto().toUpperCase());
//        produto.setMarca(produtoAtualizado.getMarca());
//        produto.setMunicipioOrigem(produtoAtualizado.getMunicipioOrigem());
//        produto.setFabricante(produtoAtualizado.getFabricante());
//        produto.setAtivo(produtoAtualizado.getAtivo());
//        produto.setFoto(produtoAtualizado.getFoto());
////        produto.setDatacadastro(produtoAtualizado.getDatacadastro());
//
//        // Verifica se o produtoAtualizado tem usuário com ID válido
//        if (produtoAtualizado.getUsuario() != null && produtoAtualizado.getUsuario().getId() != null) {
//            Usuario usuario = usuarioRepository.findById(produtoAtualizado.getUsuario().getId())
//                    .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com id: " + produtoAtualizado.getUsuario().getId()));
//            produto.setUsuario(usuario);
//        } else {
//            throw new IllegalArgumentException("ID do usuário é obrigatório para atualizar o produto.");
//        }
//
//        return repository.save(produto);
//    }

    // Atualizar por ID com DTO
    public Produto atualizarProduto(Long id, ProdutoDTO produtoAtualizadoDTO) {
        Produto produto = buscarProdutoPorId(id);

        // Deixa nome do produto em maiúsculo
        produto.setNomeProduto(produtoAtualizadoDTO.getNomeProduto().toUpperCase());
        produto.setMarca(produtoAtualizadoDTO.getMarca());
        produto.setMunicipioOrigem(produtoAtualizadoDTO.getMunicipioOrigem());
        produto.setFabricante(produtoAtualizadoDTO.getFabricante());
        produto.setAtivo(produtoAtualizadoDTO.getAtivo());
        produto.setFoto(produtoAtualizadoDTO.getFoto());

        Long idUsuario = produtoAtualizadoDTO.getIdUsuario();

        // Verifica se o produtoAtualizado tem usuário com ID válido
        if (idUsuario != null) {
            Usuario usuario = usuarioRepository.findById(idUsuario)
                    .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com id: " + idUsuario));
            produto.setUsuario(usuario);
        } else {
            throw new IllegalArgumentException("ID do usuário é obrigatório para atualizar o produto.");
        }
        return repository.save(produto);
    }

    // Remover por ID
    public void deletarProduto(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Produto não encontrado com id: " + id);
        }
        repository.deleteById(id);
    }

    public List<Produto> buscarPorNome(String nome) {
        return repository.findByNomeProdutoContainingIgnoreCase(nome);
    }
}
