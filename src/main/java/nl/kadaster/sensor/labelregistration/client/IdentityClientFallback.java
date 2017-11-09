package nl.kadaster.sensor.labelregistration.client;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.stereotype.Component;

import com.google.common.collect.ImmutableList;

import nl.kadaster.sensor.labelregistration.model.Identity;

/**
 * Use this Fallback when the Identity application is not working
 */
@Component
public class IdentityClientFallback implements IdentityClient {

	@Override
	public PagedResources<Identity> getIdentities(int page) {
		return new PagedResources<>(ImmutableList.of(new Identity()), new PagedResources.PageMetadata(1, 1, 1, 1),
				new Link("/"));
	}

	@Override
	public Identity getIdentity(String id) {
		return new Identity();
	}

	@Override
	public Identity update(String id, Identity identity) {
		return new Identity();
	}
}
