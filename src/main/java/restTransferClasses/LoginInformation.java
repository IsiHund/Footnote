/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package restTransferClasses;

/**
 *
 * @author Christopher
 */
public class LoginInformation {

    public String email;
    public String password;

    @Override
    public String toString() {
        return "LoginInformation{" + "email=" + email + ", password=" + password + '}';
    }

}
