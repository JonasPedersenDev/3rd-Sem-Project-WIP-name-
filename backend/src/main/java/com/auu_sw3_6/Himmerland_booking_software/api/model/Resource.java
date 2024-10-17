package com.auu_sw3_6.Himmerland_booking_software.api.model;

public class Resource {

    private int id;
    private String name;
    private String description;
    private String img;
    private String type;
    private int capacity;
    private String status;

    public Resource(int id, String name, String description, String img, String type, int capacity, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.img = img;
        this.type = type;
        this.capacity = capacity;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
