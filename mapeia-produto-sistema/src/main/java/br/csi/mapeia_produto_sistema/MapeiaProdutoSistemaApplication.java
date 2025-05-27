package br.csi.mapeia_produto_sistema;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MapeiaProdutoSistemaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MapeiaProdutoSistemaApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner demo(UsuarioRepository repository){
//		return (args) -> {
//			Usuario usuario = new Usuario("Felipe", "felipe@gmail.com", "59959595", "1234", "Admin", "S", new Date());
//			repository.save(usuario);
//		};
//	}

}
