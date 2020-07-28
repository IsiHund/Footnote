/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import io.swagger.annotations.ApiModel;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Random;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.validation.constraints.NotNull;

import javax.xml.bind.DatatypeConverter;
import javax.xml.bind.annotation.XmlRootElement;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

/**
 *
 * @author Christopher
 */
@NamedQueries({
    @NamedQuery(name = "User.listAll", query = "SELECT b FROM User b")
    ,    
    @NamedQuery(name = "User.login", query = "SELECT b FROM User b where b.email=:email")
    ,
    @NamedQuery(name = "User.find", query = "SELECT b FROM User b where b.id=:id")
    ,
@NamedQuery(name = "User.findByEmail", query = "SELECT b FROM User b where b.emailVerificationId=:email")
})

@Entity
@XmlRootElement
@ApiModel(value = "User", description = "Application User with Password that can login")
public class User implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String email;

    private String mobile;

    private String passwordhash;

    private String passwordsalt;

    private Role role;

    private LocalDateTime last_update;
    private String emailVerificationId = "";

    public User() {
    }

    public User(String firstname, String lastname, String email, String mobile, String passwordhash, String passwordsalt, Role role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.mobile = mobile;
        this.passwordhash = passwordhash;
        this.passwordsalt = passwordsalt;
        this.role = role;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPasswordhash() {
        return passwordhash;
    }

    public void setPasswordhash(String passwordhash) {
        this.passwordhash = passwordhash;
    }

    public String getPasswordsalt() {
        return passwordsalt;
    }

    public void setPasswordsalt(String passwordsalt) {
        this.passwordsalt = passwordsalt;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getLast_update() {
        return last_update;
    }

    public void setLast_update(LocalDateTime last_update) {
        this.last_update = last_update;
    }

    public Boolean isPasswordCorrect(String pass) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        String passwithsalt = pass.concat(passwordsalt);
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(passwithsalt.getBytes());
        byte[] digest = md.digest();
        String myHash = DatatypeConverter.printHexBinary(digest).toUpperCase();

        if (myHash.toLowerCase().equals(this.passwordhash.toLowerCase())) {
            return true;
        }
        return false;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + (int) (this.id ^ (this.id >>> 32));
        hash = 59 * hash + Objects.hashCode(this.firstname);
        hash = 59 * hash + Objects.hashCode(this.lastname);
        hash = 59 * hash + Objects.hashCode(this.email);
        hash = 59 * hash + Objects.hashCode(this.mobile);
        hash = 59 * hash + Objects.hashCode(this.passwordhash);
        hash = 59 * hash + Objects.hashCode(this.passwordsalt);
        hash = 59 * hash + Objects.hashCode(this.role);
        hash = 59 * hash + Objects.hashCode(this.last_update);
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
        final User other = (User) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.firstname, other.firstname)) {
            return false;
        }
        if (!Objects.equals(this.lastname, other.lastname)) {
            return false;
        }
        if (!Objects.equals(this.email, other.email)) {
            return false;
        }
        if (!Objects.equals(this.mobile, other.mobile)) {
            return false;
        }
        if (!Objects.equals(this.passwordhash, other.passwordhash)) {
            return false;
        }
        if (!Objects.equals(this.passwordsalt, other.passwordsalt)) {
            return false;
        }
        if (this.role != other.role) {
            return false;
        }
        if (!Objects.equals(this.last_update, other.last_update)) {
            return false;
        }
        return true;
    }

    public String getEmailVerificationId() {
        return emailVerificationId;
    }

    public void setEmailVerificationId(String emailVerificationId) {
        this.emailVerificationId = emailVerificationId;
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + ", email=" + email + ", mobile=" + mobile + ", passwordhash=" + passwordhash + ", passwordsalt=" + passwordsalt + ", role=" + role + ", last_update=" + last_update + '}';
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }

}
