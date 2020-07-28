/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import entity.Note;
import entity.RealObject;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Christopher
 */
@Stateless
public class NoteRepository extends AbstractFacade<Note> {

    public NoteRepository() {
        super(Note.class);
    }

    public Note insertNote(Note note, long id) {
        RealObject ob = em.find(RealObject.class, id);
        note = em.merge(note);
        ob.addNote(note);

        em.merge(ob);
        return note;
    }

}
