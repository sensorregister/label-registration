package nl.kadaster.sensor.labelregistration.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import nl.kadaster.sensor.labelregistration.model.Identity;

@FeignClient(name = "identity")
public interface IdentityClient {

	@RequestMapping(method = RequestMethod.GET, value = "/identities")
	PagedResources<Identity> getIdentities(@RequestParam("page") int page);

	@RequestMapping(method = RequestMethod.GET, value = "/identities/{id}")
	Identity getIdentity(@PathVariable("id") String id);

	@RequestMapping(method = RequestMethod.POST, value = "/identities/{id}", consumes = "application/json")
	Identity update(@PathVariable("id") String id, Identity identity);

	@RequestMapping(method = RequestMethod.POST, value = "/identities", consumes = "application/json")
	Identity create(Identity identity);
}