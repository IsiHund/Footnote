package auth;

import entity.Role;
import entity.User;
import java.security.Principal;
import javax.ws.rs.core.SecurityContext;

/**
 * C.G
 */
public class RequestSecurityContext implements SecurityContext {

    private User systemuser;

    /**
     *
     * @param id
     * @param role
     */
    public RequestSecurityContext(User user) {
       systemuser=user;
    }

    /**
     *
     * @return
     */
    @Override
    public Principal getUserPrincipal() {
       return systemuser;
    }

    /**
     *
     * @param role
     * @return
     */
    @Override
    public boolean isUserInRole(String role) {
        Role rolle = Role.valueOf(role);
        return rolle == systemuser.getRole();
    }

    @Override
    public boolean isSecure() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getAuthenticationScheme() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }


}
