/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import entity.FeedSubscription;
import entity.RealObject;
import entity.RealObjectFeed;
import java.util.List;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;

/**
 *
 * @author Christopher
 */
@Stateless
public class RealObjectFeedRepository extends AbstractFacade<RealObjectFeed> {

    public RealObjectFeedRepository() {
        super(RealObjectFeed.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public List<RealObjectFeed> findRealObjectFeedsbyUsergroup(long id) {
        List<FeedSubscription> ugms = em.createQuery("SELECT f FROM FeedSubscription f where f.usergroup.id=:id ", FeedSubscription.class).setParameter("id", id).getResultList();
        return ugms.stream().map(g -> g.getFeed()).collect(Collectors.toList());
    }
       @Override
    public void remove(Object id) {

        int count = getEntityManager().createNamedQuery("FeedSubscription.deletebyFeed").setParameter("id", id).executeUpdate();
        int count2 = getEntityManager().createNamedQuery("RealObjectFollowship.deletebyFeed").setParameter("id", id).executeUpdate();
        super.remove(id);
    }
}
