/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import auth.RequiresAuthorization;
import entity.RealObject;
import entity.FeedSubscription;
import entity.Note;
import entity.RealObjectFeed;
import entity.Role;
import entity.UserGroup;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.Serializable;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.json.JSONObject;
import repository.repositories.AbstractFacade;
import repository.repositories.FeedSubscriptionRepository;
import repository.repositories.RealObjectRepository;

/**
 *
 * @author Christopher
 */
@Api(value = "FeedSubscription Rest Service")
@Path("/feedSubscription")
@Stateless
@RequiresAuthorization({Role.USER, Role.ADMINISTRATOR, Role.MODERATOR})
public class FeedSubscriptionService extends EntityService<FeedSubscription, Long> {

    @Inject
    FeedSubscriptionRepository repo;

    @Override
    public AbstractFacade<FeedSubscription> getRepository() {
        return repo;
    }

}
