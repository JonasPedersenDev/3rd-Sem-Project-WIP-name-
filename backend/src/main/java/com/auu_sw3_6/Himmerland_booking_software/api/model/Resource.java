package com.auu_sw3_6.Himmerland_booking_software.api.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private String resourcePictureFileName;
    private String type;
    private long capacity;
    private String status;

    public Resource() {
    }

    public Resource(long id, String name, String description, String resourcePictureFileName, String type, long capacity, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.resourcePictureFileName = resourcePictureFileName;
        this.type = type;
        this.capacity = capacity;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getCapacity() {
        return capacity;
    }

    public void setCapacity(long capacity) {
        this.capacity = capacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResourcePictureFileName() {
        return resourcePictureFileName;
    }
    
      public void setResourcePictureFileName(String resourcePictureFileName) {
        this.resourcePictureFileName = resourcePictureFileName;
      }

}
