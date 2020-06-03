package com.incture;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.config.java.ServiceScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;

@SpringBootApplication
@ServiceScan
//@EnableAutoConfiguration(exclude = { DataSourceAutoConfiguration.class })
public class Application {

	// APPLICATION_DEV
	final String URL = "${vcap.services.aljcrmzaljucmbpapp-hdialjdatalakednvNn1KozFH4G0X5E.credentials.url}";
	final String USER = "${vcap.services.aljcrmzaljucmbpapp-hdialjdatalakednvNn1KozFH4G0X5E.credentials.user}";
	final String PASSWORD = "${vcap.services.aljcrmzaljucmbpapp-hdialjdatalakednvNn1KozFH4G0X5E.credentials.password}";

	public static void main(String[] args) {
		SpringApplication.run(Application.class);
	}

	// In this function we are getting DataSource to connect to data base
	@Bean
	@Primary
	public DataSource dataSource(@Value(URL) final String url, @Value(USER) final String user,
			@Value(PASSWORD) final String password) {
		System.err.println(url);
		System.err.println(user);
		DataSource dataSource = DataSourceBuilder.create().type(DriverManagerDataSource.class)
				.driverClassName(com.sap.db.jdbc.Driver.class.getName()).url(url).username(user).password(password)
				.build();
		return dataSource;
	}

}
