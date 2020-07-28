/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequestSecurityContext;
import auth.RestCommunicationFilter;
import entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import repository.repositories.Repository;
import repository.repositories.UserRepository;
import restTransferClasses.GeneralResponse;
import restTransferClasses.LoginInformation;
import restTransferClasses.LoginResponse;
import restTransferClasses.RegistrationInformation;

/**
 *
 * @author Christopher
 */
@Stateless
@Path("/auth")
@Api(value = "Authentication Rest Service")
public class AuthService {

    @Inject
    Repository repo;
    @Inject
    UserRepository userrepo;
    @Inject
    Logger log;

    @POST
    @Path("login")
    @ApiOperation(value = "Login: Returns a valid JWT token that expires after 2 days")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public LoginResponse login(LoginInformation info) {
        log.info("User logging in" + info);
        LoginResponse r = repo.login(info);
        if (r == null) {
            return null;
        }
        return r;
    }

    @POST
    @Path("checkTokenExpiration")
    @ApiOperation(value = "Returns a Boolean indicating whether or not a JWT Token has Expired")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public GeneralResponse checkTokenExpiration(GeneralResponse token) {
        return new GeneralResponse(RestCommunicationFilter.isTokenExpired(token.getValue()).toString());
    }

}
