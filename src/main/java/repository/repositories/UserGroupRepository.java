/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import entity.UserGroup;
import entity.UserGroupMembership;
import io.swagger.annotations.Api;
import java.util.List;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;

/**
 *
 * @author Christopher
 */
@Stateless

public class UserGroupRepository extends AbstractFacade<UserGroup> {

    public UserGroupRepository() {
        super(UserGroup.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
// @Override
//public List<UserGroup> findAll() {
//    return getEntityManager().createQuery("SELECT s FROM UserGroup s LEFT JOIN FETCH s.users LEFT JOIN FETCH s.feeds").getResultList();
//}
    @Override
  public void remove(Object id) {
        

  
        int count = getEntityManager().createNamedQuery("UserGroupMembership.deletebyUserGroup").setParameter("id", id).executeUpdate();
         int count2 = getEntityManager().createNamedQuery("FeedSubscription.deletebyUserGroup").setParameter("id", id).executeUpdate();
        super.remove(id);
    }
   
}
