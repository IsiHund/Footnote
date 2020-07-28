/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package auth;

import entity.Role;
import entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.annotation.Annotation;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Priority;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.ForbiddenException;
import javax.ws.rs.NotAllowedException;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import org.jboss.resteasy.annotations.Status;
import org.jboss.resteasy.spi.ResteasyProviderFactory;
import repository.repositories.Repository;

/**
 *
 * @author Christopher
 */
@RequiresAuthorization
@Provider
@Priority(Priorities.AUTHORIZATION)
public class RestCommunicationFilter implements ContainerRequestFilter,
        ContainerResponseFilter {

    @Context
    private ResourceInfo resourceInfo;
    private Boolean development = true;
    @PersistenceContext(unitName = "MYSQLPU")
    private EntityManager em;
    private final static String SIGNINGKEY = "secretswaggy132";

    @Inject
    org.apache.log4j.Logger log;

    public static String getSigningKey() {
        return SIGNINGKEY;
    }

    /**
     *
     */
    public RestCommunicationFilter() {

    }

    /**
     *
     * @param requestContext
     * @throws IOException
     */
    @Override
    public void filter(ContainerRequestContext requestContext)
            throws IOException {
        //print header and method

        if ((System.getProperty("development") == null)) {
            MultivaluedMap<String, String> headers = requestContext.getHeaders();
            if (development) {
                printAuthorizationheader(headers);
            }
            String authorization = requestContext.getHeaderString("Authorization");
            //is there a token?
            if (authorization != null && authorization.startsWith("Bearer")) {
                //trim token
                authorization = authorization.substring("Bearer".length()).trim();
                authorization = authorization.replace("\"", "");

                Jws<Claims> credentials;
                try {
                    credentials = decodeJWT(authorization);
                } catch (IllegalArgumentException e) {
                    credentials = null;

                } catch (UnsupportedEncodingException e) {
                    credentials = null;
                } catch (ExpiredJwtException e) {
                    requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("1: JWT Token Expired - login again")
                            .type(MediaType.TEXT_PLAIN).build());
                    credentials = null;
                } catch (Exception e) {
                    credentials = null;
                }
                //get permitted roles from the accessed method
                Class<?> resourceClass = resourceInfo.getResourceClass();
                List<Role> classRoles = extractRoles(resourceClass);

                // Get the resource method which matches with the requested URL
                // Extract the roles declared by it
                Method resourceMethod = resourceInfo.getResourceMethod();
                List<Role> methodRoles = extractRoles(resourceMethod);
                // or simple but not the best
                long id = credentials.getBody().get("id", Integer.class);
                Role role = Role.valueOf(credentials.getBody().get("role", String.class));
                User u =em.find(User.class, id);
                if(!u.getEmailVerificationId().equals("true")) {
                    requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).entity("User not verified by email").build());
                }
                RequestSecurityContext rsc = new RequestSecurityContext(u);
                log.debug(rsc.toString());
                requestContext.setSecurityContext(rsc);
                ResteasyProviderFactory.pushContext(RequestSecurityContext.class, rsc);
                try {

                    // Check if the user is allowed to execute the method
                    // The method annotations override the class annotations
                    if (methodRoles.isEmpty()) {
                        checkPermissions(classRoles, role);
                    } else {
                        checkPermissions(methodRoles, role);
                    }

                } catch (ForbiddenException e) {
                  
                      requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
                } catch (NotAuthorizedException et) {
                    requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
                } catch (Exception ex) {
                    requestContext.abortWith(
                            Response.status(Response.Status.FORBIDDEN).build());
                }
                if (false) {
                    log.warn("Authentication failed!");
                    Response.ResponseBuilder responseBuilder = Response.status(Response.Status.UNAUTHORIZED);
                    Response response = responseBuilder.build();
                    requestContext.abortWith(response);
                } else {
                    log.info("Authentication granted");
                }

            } else {
                log.warn("No authentication header found!");
                Response.ResponseBuilder responseBuilder = Response.status(Response.Status.UNAUTHORIZED);
                Response response = responseBuilder.build();
                requestContext.abortWith(response);
            }
        } else {
            log.info("Ignoring Auth for Development");
            //set default user
            ResteasyProviderFactory.pushContext(RequestSecurityContext.class,
                    new RequestSecurityContext(em.createNamedQuery("User.login", User.class).setParameter("email", "chrisi.gusenbauer101@gmail.com").getSingleResult()));
        }
    }

    private void printAuthorizationheader(MultivaluedMap<String, String> headers) {
        log.debug(" ================ Header start ================");
        headers.keySet().forEach((key) -> {
            log.debug(key + " " + headers.getFirst(key));
        });

        log.debug(" ================ Header stop ================");
    }

    private List<Role> extractRoles(AnnotatedElement annotatedElement) {
        if (annotatedElement == null) {
            return new ArrayList<>();
        } else {
            RequiresAuthorization secured = annotatedElement.getAnnotation(RequiresAuthorization.class);
            if (secured == null) {
                return new ArrayList<>();
            } else {
                Role[] allowedRoles = secured.value();
                return Arrays.asList(allowedRoles);
            }
        }
    }

    /**
     * Decode JWT Token with JWTS Libary
     *
     * @param jwt
     * @return
     * @throws java.io.UnsupportedEncodingException
     */
    public Jws<Claims> decodeJWT(String jwt) throws UnsupportedEncodingException, ExpiredJwtException {

        return Jwts.parser()
                .setSigningKey(SIGNINGKEY.getBytes("UTF-8"))
                .parseClaimsJws(jwt);

    }

    private void checkPermissions(List<Role> allowedRoles, Role userRole) throws Exception {
        // Check if the user contains one of the allowed roles
        // Throw an Exception if the user has not permission to execute the method
        boolean VALID = false;
        if (userRole == null) {
            throw new NotAuthorizedException("User has no Role");
        }
        for (Role role : allowedRoles) {
            if (role != userRole) {
            } else {
                VALID = true;
            }

        }
        if (!VALID) {
            throw new ForbiddenException("Role not sufficient to access resource");
        }
    }

    /**
     *
     * @param requestContext
     * @param responseContext
     * @throws IOException
     */
    @Override
    public void filter(ContainerRequestContext requestContext,
            ContainerResponseContext responseContext)
            throws IOException {
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
        setHTTPCode(responseContext);
    }

    private void setHTTPCode(ContainerResponseContext responseContext) {
//        Status status = getInterfaceAnnotation(resourceInfo.getResourceMethod());
//        if (status != null) {
//            int code = status.code();
//            if (code != Status.DEFAULT_CODE && responseContext.getStatus() == 200) {
//                responseContext.setStatus(code);
//            }
//        }
    }

    private static Status getInterfaceAnnotation(Method resourceMethod) {
        String methodName = resourceMethod.getName();
        Class<?>[] paramTypes = resourceMethod.getParameterTypes();
        Class<?> iface = resourceMethod.getDeclaringClass().getInterfaces()[0];
        Method ifaceMethod;
        try {
            ifaceMethod = iface.getDeclaredMethod(methodName, paramTypes);
        } catch (NoSuchMethodException e) {
            return null;
        }
        return ifaceMethod.getAnnotation(Status.class);
    }
public static Boolean isTokenExpired(String token) {
 try { Jwts.parser()
                .setSigningKey(SIGNINGKEY.getBytes("UTF-8"))
                .parseClaimsJws(token);
 }catch(ExpiredJwtException | UnsupportedEncodingException e) {
     return false;
 }
 return true;
}}
