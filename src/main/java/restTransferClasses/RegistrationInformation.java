/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package restTransferClasses;

import entity.Role;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author Christopher
 */
public class RegistrationInformation {

    public String firstname;
    public String lastname;
    public String email;
    public String mobile;
    public String passwordhash;
    public String passwordsalt;
    public Role role;

    @Override
    public String toString() {
        return "RegistrationInformation{" + "firstname=" + firstname + ", lastname=" + lastname + ", email=" + email + ", mobile=" + mobile + ", passwordhash=" + passwordhash + ", passwordsalt=" + passwordsalt + ", role=" + role + '}';
    }    
}
