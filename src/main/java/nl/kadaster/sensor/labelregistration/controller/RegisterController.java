package nl.kadaster.sensor.labelregistration.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import nl.kadaster.sensor.labelregistration.client.RegisterClient;
import nl.kadaster.sensor.labelregistration.model.CodeRegistration;

@RestController
public class RegisterController {

	private RegisterClient registerClient;

	@Autowired
	public RegisterController(RegisterClient registerClient) {
		this.registerClient = registerClient;
	}

	@GetMapping("/register")
	public ModelAndView home() {
		return new ModelAndView();
	}

	@PostMapping(path = "/register")
	public ResponseEntity<?> register(@RequestBody CodeRegistration codeRegistration) {
		registerClient.registerCodes(codeRegistration);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
