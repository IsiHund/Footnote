/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import io.swagger.annotations.ApiModel;
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
@ApiModel(value = "FeedSubscription", description = "Relationship between feed and group")
@Entity
@NamedQueries({
    @NamedQuery(name = "FeedSubscription.deletebyFeed", query = "DELETE FROM FeedSubscription c WHERE c.feed.id =:id"),
        @NamedQuery(name = "FeedSubscription.deletebyUserGroup", query = "DELETE FROM FeedSubscription c WHERE c.usergroup.id =:id")
})
public class FeedSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
     @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    private RealObjectFeed feed;
     @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    private UserGroup usergroup;

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

    public UserGroup getUsergroup() {
        return usergroup;
    }

    public void setUsergroup(UserGroup usergroup) {
        this.usergroup = usergroup;
    }

    public FeedSubscription() {
    }

    public FeedSubscription(RealObjectFeed feed, UserGroup usergroup) {
        this.feed = feed;
        this.usergroup = usergroup;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.id);
        hash = 17 * hash + Objects.hashCode(this.feed);
        hash = 17 * hash + Objects.hashCode(this.usergroup);
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
        final FeedSubscription other = (FeedSubscription) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.feed, other.feed)) {
            return false;
        }
        if (!Objects.equals(this.usergroup, other.usergroup)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "FeedSubscription{" + "id=" + id + ", feed=" + feed + ", usergroup=" + usergroup + '}';
    }

}
