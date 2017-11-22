package nl.kadaster.sensor.labelregistration.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.base.MoreObjects;
import org.springframework.hateoas.Resource;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Identity {

	private String id;
	private String telephoneNumber;
	private List<Resource<Code>> codes = new ArrayList<Resource<Code>>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTelephoneNumber() {
		return telephoneNumber;
	}

	public void setTelephoneNumber(String telephoneNumber) {
		this.telephoneNumber = telephoneNumber;
	}

	public List<Resource<Code>> getCodes() {
		return codes;
	}

	public void setCodes(List<Resource<Code>> codes) {
		this.codes = codes;
	}

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this)
				.add("id", id)
				.add("telephoneNumber", telephoneNumber)
				.add("codes", codes)
				.toString();
	}

}
