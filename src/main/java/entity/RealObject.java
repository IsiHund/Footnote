/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import io.swagger.annotations.ApiModel;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Christopher
 */
@Entity
@NamedQueries({
    @NamedQuery(name = "RealObject.listAll", query = "SELECT b FROM RealObject b")
    ,
    @NamedQuery(name = "RealObject.find", query = "SELECT b FROM RealObject b where b.id=:id")

})
@ApiModel(value = "RealObject", description = "An Object in the Real World")
@XmlRootElement
public class RealObject implements Serializable {

    private static final long serialVersionUID = 1L;
//[{"id":"1","longitude":"-0.074","latitude":"48.0955207","description":"This is the description of POI#1","name":"POI#1"},
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String vuforiaid;
    private String name;
    private String description;
    private double latitude;
    private double longitude;
    private String image;

    @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Note> notes = new LinkedList<>();

    public RealObject() {

    }

    public RealObject(String name, String description, double latitude, double longitude) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public RealObject(String name, String description, double latitude, double longitude, String image) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
    }

    public RealObject(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public void addNote(Note e) {
        notes.add(e);

    }

    public void removeNote(Note e) {
        notes.remove(e);

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 41 * hash + Objects.hashCode(this.id);
        hash = 41 * hash + Objects.hashCode(this.name);
        hash = 41 * hash + Objects.hashCode(this.description);
        hash = 41 * hash + (int) (Double.doubleToLongBits(this.latitude) ^ (Double.doubleToLongBits(this.latitude) >>> 32));
        hash = 41 * hash + (int) (Double.doubleToLongBits(this.longitude) ^ (Double.doubleToLongBits(this.longitude) >>> 32));
        hash = 41 * hash + Objects.hashCode(this.image);
        hash = 41 * hash + Objects.hashCode(this.notes);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final RealObject other = (RealObject) obj;
        if (Double.doubleToLongBits(this.latitude) != Double.doubleToLongBits(other.latitude)) {
            return false;
        }
        if (Double.doubleToLongBits(this.longitude) != Double.doubleToLongBits(other.longitude)) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.image, other.image)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.notes, other.notes)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "RealObject{" + "id=" + id + ", name=" + name + ", description=" + description + ", latitude=" + latitude + ", longitude=" + longitude + ", image=" + image + ", notes=" + notes + '}';
    }

    public String getVuforiaid() {
        return vuforiaid;
    }

    public void setVuforiaid(String vuforiaid) {
        this.vuforiaid = vuforiaid;
    }

}
