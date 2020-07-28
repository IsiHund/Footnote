/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequiresAuthorization;
import entity.RealObjectFeed;
import entity.Role;
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
import repository.repositories.AbstractFacade;
import repository.repositories.RealObjectFeedRepository;

/**
 *
 * @author Christopher
 */
@Api(value = "RealObjectFeed Rest Service")
@Path("/realObjectFeed")
@Stateless
@RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
public class RealObjectFeedService extends EntityService<RealObjectFeed, String> {

    @Inject
    RealObjectFeedRepository repo;

    @Override
    public AbstractFacade getRepository() {
        return repo;
    }

    public RealObjectFeedService() {
    }

    @GET
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Returns List of RealObjectFeeds a usergroup follows with sent usegroupid")
    @Path("findRealObjectFeedsbyUsergroup/{id}")
    public List<RealObjectFeed> findRealObjectFeedsbyUsergroup(@PathParam("id") long id) {

        return repo.findRealObjectFeedsbyUsergroup(id);

    }
}
