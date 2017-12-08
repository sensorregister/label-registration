package nl.kadaster.sensor.labelregistration.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import nl.kadaster.sensor.labelregistration.model.CodeRegistration;

@FeignClient(name = "register")
public interface RegisterClient {

	@RequestMapping(method = RequestMethod.POST, value = "/codes/register", consumes = "application/json")
	boolean registerCodes(CodeRegistration codeRegistration);

}