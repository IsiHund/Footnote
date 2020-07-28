/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import io.swagger.annotations.ApiModel;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;

/**
 *
 * @author Christopher
 */
@Entity
@NamedQueries({
    @NamedQuery(name = "RealObjectFollowship.deletebyRealobject", query = "DELETE FROM RealObjectFollowship c WHERE c.realobject.id =:id"),
        @NamedQuery(name = "RealObjectFollowship.deletebyFeed", query = "DELETE FROM RealObjectFollowship c WHERE c.feed.id =:id")
})
@ApiModel(value = "RealObjectFollowship", description = "Relationship between feed and realobject")
public class RealObjectFollowship implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    private RealObjectFeed feed;
     @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    private RealObject realobject;

    public RealObjectFollowship() {
    }

    public RealObjectFollowship(RealObjectFeed feed, RealObject realobject) {
        this.feed = feed;
        this.realobject = realobject;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RealObjectFeed getFeed() {
        return feed;
    }

    public void setFeed(RealObjectFeed feed) {
        this.feed = feed;
    }

    public RealObject getRealobject() {
        return realobject;
    }

    public void setRealobject(RealObject realobject) {
        this.realobject = realobject;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 41 * hash + Objects.hashCode(this.id);
        hash = 41 * hash + Objects.hashCode(this.feed);
        hash = 41 * hash + Objects.hashCode(this.realobject);
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
        final RealObjectFollowship other = (RealObjectFollowship) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.feed, other.feed)) {
            return false;
        }
        if (!Objects.equals(this.realobject, other.realobject)) {
            return false;
        }
        return true;
    }

}
