/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequiresAuthorization;
import entity.RealObject;
import entity.RealObjectFollowship;
import entity.Role;
import io.swagger.annotations.Api;
import java.io.Serializable;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.ws.rs.Path;
import repository.repositories.AbstractFacade;
import repository.repositories.RealObjectFollowshipRepository;

/**
 *
 * @author Christopher
 */
@Api(value = "RealObjectFollowship Rest Service")
@Path("/realObjectFollowship")
@Stateless
@RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
public class RealObjectFollowshipService extends EntityService<RealObjectFollowship, Long> {

    @Inject
    RealObjectFollowshipRepository objectrepo;

    @Override
    public AbstractFacade<RealObjectFollowship> getRepository() {
        return objectrepo;
    }
}
