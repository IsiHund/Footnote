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
@Entity
@ApiModel(value = "UserGroupMembership", description = "Relationship between Usergroup and user")
@NamedQueries({
    @NamedQuery(name = "UserGroupMembership.deletebyUser", query = "DELETE FROM UserGroupMembership c WHERE c.user.id=:id"),
        @NamedQuery(name = "UserGroupMembership.deletebyUserGroup", query = "DELETE FROM UserGroupMembership c WHERE c.usergroup.id=:id")
})
public class UserGroupMembership {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
     @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    private UserGroup usergroup;
     @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    private User user;

    public UserGroupMembership(UserGroup usergroup, User user) {
        this.usergroup = usergroup;
        this.user = user;
    }

    public UserGroupMembership() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserGroup getUsergroup() {
        return usergroup;
    }

    public void setUsergroup(UserGroup usergroup) {
        this.usergroup = usergroup;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 17 * hash + Objects.hashCode(this.id);
        hash = 17 * hash + Objects.hashCode(this.usergroup);
        hash = 17 * hash + Objects.hashCode(this.user);
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
        final UserGroupMembership other = (UserGroupMembership) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.usergroup, other.usergroup)) {
            return false;
        }
        if (!Objects.equals(this.user, other.user)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "UserGroupMembership{" + "id=" + id + ", usergroup=" + usergroup + ", user=" + user + '}';
    }

}
