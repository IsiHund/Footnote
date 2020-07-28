/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequestSecurityContext;
import auth.RequiresAuthorization;
import entity.RealObject;
import entity.RealObjectFeed;
import entity.Role;
import entity.User;
import entity.UserGroup;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.LinkedList;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.ForbiddenException;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import repository.repositories.AbstractFacade;
import repository.repositories.RealObjectFeedRepository;
import repository.repositories.RealObjectRepository;
import repository.repositories.UserGroupRepository;
import repository.repositories.UserRepository;
import restTransferClasses.GeneralResponse;
import restTransferClasses.RegistrationInformation;

/**
 *
 * @author Christopher
 */
@Api(value = "User Rest Service")
@Path("/user")

@Stateless
public class UserService extends EntityService<User, Long> {

    @Inject
    Logger log;
    @Inject
    UserRepository repo;

    @Context
    RequestSecurityContext security;
private final String ServerEmail="johuber22@gmail.com";
private final String MailPass="Gus4Foot";
private final String ServerURL="https://vm68.htl-leonding.ac.at/javaendpoint/footnote/rest/";
    @Override
    public AbstractFacade<User> getRepository() {
        return repo;
    }
    @POST
    @Path("register")
    @ApiOperation(value = "Creates a new User")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public GeneralResponse register(RegistrationInformation info) {
        try {
            //Caused by: java.lang.NoSuchMethodError: entity.User.setEmailVerificationId(Ljava/lang/String;)V
            User u =repo.create(new User(info.firstname, info.lastname, info.email, info.mobile, info.passwordhash, info.passwordsalt, info.role));
            u.setEmailVerificationId(repo.getSaltString());
            String[] arr = {info.email};
            repo.sendFromGMail(ServerEmail, MailPass,  arr, "Footnote Email Verification", "Please click here to finish your registration "
                    + "\n"+ServerURL+"user/verifyUser/"+u.getEmailVerificationId());
        } catch (Exception ex) {
            log.warn("User" + info + "already exists");
            return new GeneralResponse("Didnt create User " + info.email + " because this User already exists");
        }
        log.info("new User registered" + info);
        return new GeneralResponse("Created new User" + info.email);
    }

//    public void checkPermissions(long id) {
//        if (!(security.getId() == id || (security.getRole() == Role.ADMINISTRATOR))) {
//            throw new ForbiddenException("Resource not permitted for User");
//        }
//    }
    @RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
    @GET
    @ApiOperation(value = "Gets the currently authenticated Users Feeds he follows via his groups")
    @Path("groups/feeds")
    public List<RealObjectFeed> getUsersFeeds() {

        return repo.getUserFeeds(Long.valueOf(security.getUserPrincipal().getName()));

    }

    @RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
    @GET
    @ApiOperation(value = "Gets the currently authenticated Users RealObjects his Feeds contain")
    @Path("groups/feeds/realobjects")
    public List<RealObject> getUsersRealObjects() {

        //distinct stream.distinct
        return repo.getUsersRealObjects(Long.valueOf(security.getUserPrincipal().getName()));
    }
  @GET
    @Path("verifyUser/{id}")
    @ApiOperation(value = "Verifys a Users Registration(with String ID from Email)")
    @Produces(MediaType.TEXT_PLAIN)
    public String verify(@PathParam("id") String id) {
      repo.verifyUser(id);
      return "successfull";
    }
}
