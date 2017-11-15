package nl.kadaster.sensor.labelregistration.model;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.base.MoreObjects;
import nl.kadaster.sensor.labelregistration.controller.RegisterController;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Identity {

	private String id;
	private String telephoneNumber;
	private List<Code> codes;

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

	public List<Code> getCodes() {
		return codes;
	}

	public void setCodes(List<Code> codes) {
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

	public static Identity fromRegistration(RegisterController.Registration registration) {
		Identity result = new Identity();
		result.setTelephoneNumber(registration.getTelephoneNumber());

		result.setCodes(registration.getCodes().stream().map(Code::new).collect(Collectors.toList()));

		return result;
	}

	public static class Code {
		private String value;

		public Code() {
		}

		public Code(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}
	}
}
