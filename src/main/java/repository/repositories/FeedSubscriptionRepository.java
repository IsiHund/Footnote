package repository.repositories;

import entity.RealObject;
import entity.FeedSubscription;
import javax.persistence.EntityManager;

/**
 *
 * @author Christopher
 */
public class FeedSubscriptionRepository extends AbstractFacade<FeedSubscription> {

    public FeedSubscriptionRepository() {
        super(FeedSubscription.class);
    }

    //todo override
    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
