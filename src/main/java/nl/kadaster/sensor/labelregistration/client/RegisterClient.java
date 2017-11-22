package nl.kadaster.sensor.labelregistration.client;

import nl.kadaster.sensor.labelregistration.model.Code;
import nl.kadaster.sensor.labelregistration.model.Identity;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "register")
public interface RegisterClient {

	@RequestMapping(method = RequestMethod.GET, value = "/identities")
	PagedResources<Identity> getIdentities(@RequestParam("page") int page);

	@RequestMapping(method = RequestMethod.POST, value = "/identities", consumes = "application/json")
    Resource<Identity> create(Identity identity);

	@RequestMapping(method = RequestMethod.POST, value = "/codes", consumes = "application/json")
    Code create(Code code);

    @RequestMapping(method = RequestMethod.PUT, consumes = "text/uri-list",  value = "/codes/{codeId}/identity/")
    Resource<Code> linkIdentity(@PathVariable("codeId") long codeId, @RequestBody String identityUri);

}