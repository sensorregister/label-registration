package nl.kadaster.sensor.labelregistration.model;

import java.util.HashSet;
import java.util.Set;

import com.google.common.base.MoreObjects;

public class CodeRegistration {
	private String telephoneNumber;
	private Set<String> codes = new HashSet<>();

	public CodeRegistration() {
	}

	public String getTelephoneNumber() {
		return telephoneNumber;
	}

	public void setTelephoneNumber(String telephoneNumber) {
		this.telephoneNumber = telephoneNumber;
	}

	public Set<String> getCodes() {
		return codes;
	}

	public void setCodes(Set<String> codes) {
		this.codes = codes;
	}

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this).add("telephoneNumber", telephoneNumber).add("codes", codes).toString();
	}
}
