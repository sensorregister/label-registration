package nl.kadaster.sensor.labelregistration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.collect.ImmutableMap;

import nl.kadaster.sensor.labelregistration.client.IdentityClient;

@RestController
public class RegisterController {

	private IdentityClient identityClient;

	@Autowired
	public RegisterController(IdentityClient identityClient) {
		this.identityClient = identityClient;
	}

	@GetMapping("/register")
	public ModelAndView home() {
		return new ModelAndView();
	}

	@GetMapping("/identities")
	public ResponseEntity<?> identities(@RequestParam(value = "page", required = false, defaultValue = "0") int page) {
		return new ResponseEntity<>(ImmutableMap.of("identities", identityClient.getIdentities(page).getContent()),
				HttpStatus.OK);
	}

}
