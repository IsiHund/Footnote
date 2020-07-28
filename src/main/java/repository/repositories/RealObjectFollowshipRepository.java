/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import entity.RealObject;
import entity.RealObjectFollowship;
import javax.persistence.EntityManager;

/**
 *
 * @author Christopher
 */
public class RealObjectFollowshipRepository extends AbstractFacade<RealObjectFollowship> {

    public RealObjectFollowshipRepository() {
        super(RealObjectFollowship.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
