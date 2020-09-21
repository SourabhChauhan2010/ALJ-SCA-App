package com.incture.alj;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Primary;

import com.zaxxer.hikari.HikariDataSource;

@SpringBootApplication
@ComponentScan("com.incture")
public class AljServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(AljServicesApplication.class, args);
	}

	@Bean
	@Primary
	public DataSource dataSource(@Value("${vcap.services.ALJSCAAPP.credentials.url}") final String url,
			@Value("${vcap.services.ALJSCAAPP.credentials.user}") final String user,
			@Value("${vcap.services.ALJSCAAPP.credentials.password}") final String password) {
		
		System.err.println("> URL : " + url);
		System.err.println("> USER : " + user);
		
		return DataSourceBuilder.create().type(HikariDataSource.class)
				.driverClassName(com.sap.db.jdbc.Driver.class.getName()).url(url).username(user).password(password)
				.build();
	}
}
