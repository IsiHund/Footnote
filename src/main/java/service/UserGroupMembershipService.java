/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequiresAuthorization;
import entity.RealObject;
import entity.Role;
import entity.UserGroupMembership;
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
import repository.repositories.UserGroupMembershipRepository;

/**
 *
 * @author Christopher
 */
@Api(value = "UserGroupMembership Rest Service")
@Path("/usergroupmembership")
@Stateless
@RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
public class UserGroupMembershipService extends EntityService<UserGroupMembership, Long> {

    @Inject
    UserGroupMembershipRepository objectrepo;

    @Override
    public AbstractFacade<UserGroupMembership> getRepository() {
        return objectrepo;
    }
}
