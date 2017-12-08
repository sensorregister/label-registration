package nl.kadaster.sensor.labelregistration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.hateoas.config.EnableHypermediaSupport;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableHypermediaSupport(type = EnableHypermediaSupport.HypermediaType.HAL)
@EnableFeignClients
@EnableOAuth2Sso
@RestController
public class LabelRegistrationApplication {

	public static void main(String[] args) {
		SpringApplication.run(LabelRegistrationApplication.class, args);
	}

	@RequestMapping("/")
	public String home() {
		return "Hallo!";
	}
}
