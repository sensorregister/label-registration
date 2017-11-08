package nl.kadaster.sensor.labelregistration;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {

    @GetMapping("/register")
    public String home() {
        return "todo";
    }

}
