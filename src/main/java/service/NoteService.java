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

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import repository.repositories.AbstractFacade;
import repository.repositories.NoteRepository;

/**
 *
 * @author Christopher
 */
@Api(value = "Note Rest Service")
@Path("/note")
@RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
@Stateless
public class NoteService extends EntityService<Note, Long> {

    @Inject
    NoteRepository repo;

    @Path("insertNote/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresAuthorization({Role.ADMINISTRATOR, Role.GUEST, Role.MODERATOR, Role.USER})
    @POST
    @ApiOperation("Inserts a Note into the notes of an realobject")
    public Note insertNote(Note note, @PathParam("id") long id) {
        return this.repo.insertNote(note, id);
    }

    @Override
    public AbstractFacade<Note> getRepository() {
        return repo;
    }

}
