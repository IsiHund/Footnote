/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequiresAuthorization;
import entity.Note;
import entity.RealObject;
import entity.Role;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.log4j.Logger;
import repository.repositories.AbstractFacade;
import repository.repositories.RealObjectRepository;
import restTransferClasses.Targetinformation;

/**
 *
 * @author Christopher
 */
@Api(value = "RealObject Rest Service")
@Path("/realObject")
@Stateless
@RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
public class RealObjectService extends EntityService<RealObject, Long> {

    @Inject
    RealObjectRepository objectrepo;
 @Inject
    Logger log;

    @POST
    @Path("getObjectsNotes")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    @RequiresAuthorization({Role.ADMINISTRATOR, Role.GUEST, Role.MODERATOR, Role.USER})
    public List<Note> getObjectsNotes(long id) {

        return getRepository().find(id).getNotes();
    }

    @Override
    public AbstractFacade<RealObject> getRepository() {
        return objectrepo;
    }

    @GET
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Returns List of RealObjects a feed contains with sent realobjectfeedid")
    @Path("findRealObjectbyFeed/{id}")
    public List<RealObject> findRealObjectbyFeed(@PathParam("id") long id) {

        return objectrepo.findRealObjectbyFeed(id);

    }
   @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("postNewTarget")
    @ApiOperation(value = "postnewTarget", hidden = false)
    @RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
    public Response postNewTarget(Targetinformation info) {
        try {
        objectrepo.postNewTarget(info);
           } catch (Exception ex) {
            log.warn("Posting new Target failed " + ex.getLocalizedMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return Response.ok("\"succes\"").build();
    }
}
