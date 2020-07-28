/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import entity.RealObject;
import entity.RealObjectFollowship;
import java.util.List;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.inject.Inject;
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
import restTransferClasses.Targetinformation;
import vuforia.DeleteTarget;
import vuforia.PostNewTarget;

/**
 *
 * @author Christopher
 */
@Stateless

public class RealObjectRepository extends AbstractFacade<RealObject> {

    @Inject
    PostNewTarget targetposter;
    @Inject
    DeleteTarget targetdeleter;

    public RealObjectRepository() {
        super(RealObject.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public List<RealObject> findRealObjectbyFeed(long id) {
        List<RealObjectFollowship> ugms = em.createQuery("SELECT r FROM RealObjectFollowship r where r.feed.id=:id ", RealObjectFollowship.class).setParameter("id", id).getResultList();
        return ugms.stream().map(g -> g.getRealobject()).collect(Collectors.toList());
    }

    @Override
    public void remove(Object id) {
        

        RealObject obj = em.find(RealObject.class, id);
        if (obj != null && obj.getVuforiaid() != null && !obj.getVuforiaid().equals("")) {
            deleteTarget(obj.getVuforiaid());
        }
        int count = getEntityManager().createNamedQuery("RealObjectFollowship.deletebyRealobject").setParameter("id", id).executeUpdate();
        super.remove(id);
    }

    public void postNewTarget(Targetinformation info) throws Exception {
        targetposter.setTargetName(String.valueOf(info.getId()));
        targetposter.setMetadata(String.valueOf(info.getId()));
        RealObject obj = em.find(RealObject.class, info.getId());

        String targetid = targetposter.postTargetThenPollStatus(obj.getImage());
        obj.setVuforiaid(targetid);

    }

    public void deleteTarget(String id) {
        targetdeleter.targetId = id;
        targetdeleter.deactivateThenDeleteTarget();
    }
}
