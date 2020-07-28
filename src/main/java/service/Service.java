/*
TODO: Sharing objects
Get notifications from objects, be able to filter them
support different file types (already exits?)
WIe beanvalidation benutzen wenn zb id gar nicht enthalten sein soll weil generatedvalue
macht ein exceptionmapper sinn. warum hibernate und jaxrs beanval? nur für method zb string notblank?
zum realobjectfeed ein update machen - Liste Mitgeben und mergen geht das? oder brauch ich eine extra funktion
 */
package service;

import auth.RequestSecurityContext;
import auth.RequiresAuthorization;
import entity.Role;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Contact;
import io.swagger.annotations.Info;
import io.swagger.annotations.SwaggerDefinition;
import java.io.File;
import java.security.NoSuchAlgorithmException;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import repository.repositories.Repository;
import restTransferClasses.Targetinformation;
import vuforia.PostNewTarget;

/**
 * A simple REST service which is able to say hello to someone using
 * HelloService Please take a look at the web.xml where JAX-RS is enabled
 * http://localhost:8080/footnote/rest/json
 *
 * @author gbrey@redhat.com
 *
 */
@SwaggerDefinition(info = @Info(
        title = "Footnote-Server Swagger-UI",
        description = "Footnote combines real objects with digital information",
        version = "0.9.1",
        contact = @Contact(
                name = "Christopher Gusenbauer",
                email = "chrisi.gusenbauer101@gmail.com"
        )
)
)
@Api(value = "Main Rest Service")
@Path("/")
@Stateless
public class Service {

    @Inject
    Logger log;

    @Inject
    Repository repo;

    @Context
    private RequestSecurityContext re;

    @GET
    @Path("/json")
    @ApiOperation(value = "Prints test json")
    @Produces({"application/json"})
    public String getHelloWorldJSON() {
        log.info("Hello World");
        return "{\"result\":\"" + "\"}";
    }

    @GET
    @ApiOperation(value = "Prints test xml")
    @Path("/xml")
    @Produces({"application/xml"})
    public String getHelloWorldXML() {

        return "<xml><result>";
    }
}
