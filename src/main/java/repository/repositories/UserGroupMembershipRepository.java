/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import entity.UserGroupMembership;
import javax.persistence.EntityManager;

/**
 *
 * @author Christopher
 */
/**
 *
 * @author Christopher
 */
public class UserGroupMembershipRepository extends AbstractFacade<UserGroupMembership> {

    public UserGroupMembershipRepository() {
        super(UserGroupMembership.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
