package nl.kadaster.sensor.labelregistration.controller;

import nl.kadaster.sensor.labelregistration.model.Identity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.collect.ImmutableMap;

import nl.kadaster.sensor.labelregistration.client.RegisterClient;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RegisterController {

	private RegisterClient registerClient;

	@Autowired
	public RegisterController(RegisterClient registerClient) {
		this.registerClient = registerClient;
	}

	@GetMapping("/register")
	public ModelAndView home() {

	    Registration registration = new Registration();
        return new ModelAndView();
	}

	@PostMapping(path = "/register")
    public ResponseEntity<?> register(@RequestBody Registration registration) {

        Identity identity = Identity.fromRegistration(registration);
        Identity result = registerClient.create(identity);

        return new ResponseEntity<>(HttpStatus.OK);
    }


	@GetMapping("/identities")
	public ResponseEntity<?> identities(@RequestParam(value = "page", required = false, defaultValue = "0") int page) {
		return new ResponseEntity<>(ImmutableMap.of("identities", registerClient.getIdentities(page).getContent()),
				HttpStatus.OK);
	}

	public static class Registration {
	    private String telephoneNumber;
	    private List<String> codes = new ArrayList<>();

        public Registration() {
        }

        public String getTelephoneNumber() {
            return telephoneNumber;
        }

        public List<String> getCodes() {
            return codes;
        }

        public void setTelephoneNumber(String telephoneNumber) {
            this.telephoneNumber = telephoneNumber;
        }

        public void setCodes(List<String> codes) {
            this.codes = codes;
        }
    }

}
