/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequiresAuthorization;
import entity.Note;
import entity.Role;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import org.json.JSONObject;
import repository.repositories.AbstractFacade;
import restTransferClasses.GeneralResponse;

/**
 *
 * @author Christopher
 * @param <EntityType>
 * @param <KeyType>
 */
public abstract class EntityService<EntityType, KeyType> {

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Inserts a New Entity in the Database")

    public EntityType create(EntityType entity) {
        return getRepository().create(entity);

    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Finds Entity with sent key")
    // response = EntityType.class,)
    @Path("/{id}")
    public EntityType find(@PathParam("id") KeyType id) {
        return getRepository().find(id);

    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Returns Amount")
    // response = EntityType.class,)
    @Path("count")
    public int count() {
        return getRepository().count();

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Finds all Entities of this Type")
    public List<EntityType> findAll(@ApiParam(value = "First Result") @QueryParam("start") int start, @ApiParam(value = "Amount of Results") @QueryParam("size") int size) {
        if (start > 0 && size > 0) {
            return getRepository().findRange(new int[]{start, size});
        }
        return getRepository().findAll();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Updates Entity")
    public EntityType edit(EntityType entity) {
        return getRepository().edit(entity);
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Deletes Entity")
    @Path("/{id}")
    public GeneralResponse remove(@PathParam("id") KeyType id) {
        getRepository().remove(id);
        return new GeneralResponse("successfully deleted");
    }

    public abstract AbstractFacade<EntityType> getRepository();

}
