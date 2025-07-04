package br.csi.mapeia_produto_sistema.infra.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AutenticacaoFilter autenticaoFilter;

    public SecurityConfig(AutenticacaoFilter filtro){
        this.autenticaoFilter = filtro;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http
                .cors(Customizer.withDefaults())
                .csrf(csrf-> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth->
                        auth
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .requestMatchers("/uploads/**").permitAll()
                                .requestMatchers(HttpMethod.POST,"/login", "/usuario", "/produto", "/estabelecimento", "/associacao").permitAll()
                                .requestMatchers(HttpMethod.GET,
                                        "/usuario",
                                        "/usuario/{id}",
                                        "/produto",
                                        "/estabelecimento",
                                        "/associacao",
                                        "/produto/buscar",
                                        "/produto/**",
                                        "/produto/{id}",
                                        "/estabelecimento/{id}",
                                        "/estabelecimento/buscar",
                                        "/estabelecimento**",
                                        "/associacao/produto/**",
                                        "/associacao/{id}"
                                ).permitAll()
                                .requestMatchers(HttpMethod.PUT, "/usuario", "/produto", "/estabelecimento", "/associacao").permitAll()
                                .requestMatchers(HttpMethod.DELETE, "/usuario", "/produto", "/estabelecimento", "/associacao").permitAll()
//                                .requestMatchers(HttpMethod.GET,
//                                        "/produto/buscar",
//                                        "/produto/**",
//                                        "/estabelecimento/{id}",
//                                        "/estabelecimento/buscar",
//                                        "/estabelecimento**",
//                                        "/associacao/produto/**",
//                                        "/associacao/{id}"
//                                ).permitAll()
//                                .requestMatchers(HttpMethod.GET,"/usuario", "/produto", "/estabelecimento", "/associacao").permitAll()
//                                .requestMatchers(HttpMethod.GET, "/usuario").hasAnyAuthority("Admin", "Produtor", "Consumidor")
//                                .requestMatchers(HttpMethod.GET, "/produto").hasAnyAuthority("Admin", "Produtor", "Consumidor")
//                                .requestMatchers(HttpMethod.GET, "/estabelecimento").hasAnyAuthority("Admin", "Produtor", "Consumidor")
//                                .requestMatchers(HttpMethod.GET, "/associacao").hasAnyAuthority("Admin", "Produtor", "Consumidor")
//                                .requestMatchers(HttpMethod.PUT, "/usuario").hasAnyAuthority("Admin", "Produtor", "Consumidor")
//                                .requestMatchers(HttpMethod.PUT, "/produto").hasAnyAuthority("Admin", "Produtor", "Consumidor")
//                                .requestMatchers(HttpMethod.PUT, "/estabelecimento").hasAnyAuthority("Admin", "Produtor", "Consumidor")
//                                .requestMatchers(HttpMethod.PUT, "/associacao").hasAnyAuthority("Admin", "Produtor", "Consumidor")
                                .anyRequest().authenticated())
                .addFilterBefore(this.autenticaoFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
