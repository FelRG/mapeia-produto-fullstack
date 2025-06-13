package br.csi.mapeia_produto_sistema.service;

import br.csi.mapeia_produto_sistema.dto.EstabelecimentoDTO;
import br.csi.mapeia_produto_sistema.model.Estabelecimento;
import br.csi.mapeia_produto_sistema.model.Usuario;
import br.csi.mapeia_produto_sistema.repository.EstabelecimentoRepository;
import br.csi.mapeia_produto_sistema.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EstabelecimentoService {

    private final EstabelecimentoRepository repository;
    private final UsuarioRepository usuarioRepository;

    public EstabelecimentoService(EstabelecimentoRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    // Criar ou atualizar com DTO
    public Estabelecimento salvarEstabelecimento(EstabelecimentoDTO dto) {
        Long idUsuario = dto.getIdUsuario();
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + idUsuario));

        Estabelecimento estabelecimento = new Estabelecimento();
        estabelecimento.setNomeEstabelecimento(dto.getNomeEstabelecimento().toUpperCase());
        estabelecimento.setEndereco(dto.getEndereco());
        estabelecimento.setNumero(dto.getNumero());
        estabelecimento.setEstado(dto.getEstado());
        estabelecimento.setCategoria(dto.getCategoria());
        estabelecimento.setAtivo(dto.getAtivo());
        estabelecimento.setCidade(dto.getCidade());
        estabelecimento.setComplemento(dto.getComplemento());
        estabelecimento.setDatacadastro(new Date());
        estabelecimento.setUsuario(usuario);

        return repository.save(estabelecimento);
    }

    // Listar todos
    public List<Estabelecimento> listarEstabelecimentos() {
        return repository.findAll();
    }

    // Buscar por ID
    public Estabelecimento buscarEstabelecimentoPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estabelecimento não encontrado com ID: " + id));
    }

    // Atualizar por ID com DTO
    public Estabelecimento atualizarEstabelecimento(Long id, EstabelecimentoDTO dto) {
        Estabelecimento est = buscarEstabelecimentoPorId(id);

        est.setNomeEstabelecimento(dto.getNomeEstabelecimento().toUpperCase());
        est.setEndereco(dto.getEndereco());
        est.setNumero(dto.getNumero());
        est.setEstado(dto.getEstado());
        est.setCategoria(dto.getCategoria());
        est.setAtivo(dto.getAtivo());
        est.setCidade(dto.getCidade());
        est.setComplemento(dto.getComplemento());

        Long idUsuario = dto.getIdUsuario();
        if (idUsuario != null) {
            Usuario usuario = usuarioRepository.findById(idUsuario)
                    .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + idUsuario));
            est.setUsuario(usuario);
        } else {
            throw new IllegalArgumentException("ID do usuário é obrigatório para atualizar o estabelecimento.");
        }

        return repository.save(est);
    }

    // Deletar por ID
    public void deletarEstabelecimento(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Estabelecimento não encontrado com ID: " + id);
        }
        repository.deleteById(id);
    }

    // Buscar por nome (opcional, se desejar implementar no repository)
    public List<Estabelecimento> buscarPorNome(String nome) {
        return repository.findByNomeEstabelecimentoContainingIgnoreCase(nome);
    }

    public List<Estabelecimento> buscarPrimeiros(int limite) {
        return repository.findTopN(limite);
    }

}
