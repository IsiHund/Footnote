/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequiresAuthorization;
import entity.Role;
import entity.User;
import entity.UserGroup;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.apache.log4j.Logger;
import repository.repositories.AbstractFacade;
import repository.repositories.Repository;
import repository.repositories.UserGroupRepository;
import repository.repositories.UserRepository;

/**
 *
 * @author Christopher
 */
@Api(value = "UserGroup Rest Service")
@Path("/UserGroup")
@Stateless
@RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
public class UserGroupService extends EntityService<UserGroup, Long> {

    @Inject
    Logger log;
    @Inject
    UserGroupRepository repo;
 @Inject
    UserRepository urepo;
    @Override
    public AbstractFacade<UserGroup> getRepository() {
        return repo;
    }
 
    @GET
    @ApiOperation(value = "Gets the currently authenticated Users Groups he belongs to")
    @Path("getUserGroupsbyUserid/{id}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserGroup> getUsersGroups(@PathParam("id") long id) {
        return urepo.getUsersGroups(id);

    }
 
}
