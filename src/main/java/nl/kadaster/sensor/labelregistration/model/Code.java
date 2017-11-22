package nl.kadaster.sensor.labelregistration.model;

public class Code {
    private Long id;
    private String value;
    private String status;

    public Code() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
