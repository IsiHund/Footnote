/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import auth.RestCommunicationFilter;
import entity.FeedSubscription;
import entity.Note;
import entity.NoteType;
import entity.RealObject;
import entity.RealObjectFeed;
import entity.RealObjectFollowship;
import entity.Role;
import entity.User;
import entity.UserGroup;
import entity.UserGroupMembership;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.BadRequestException;
import javax.xml.bind.DatatypeConverter;
import logic.FileHandlerServlet;
import restTransferClasses.LoginInformation;
import restTransferClasses.LoginResponse;
import restTransferClasses.Targetinformation;
import vuforia.DeleteTarget;
import vuforia.PostNewTarget;

/**
 *
 * @author Christopher
 */
@Stateless
public class Repository {

    @PersistenceContext(unitName = "MYSQLPU")
    private EntityManager em;
    @Inject
    org.apache.log4j.Logger log;
    @Inject
    RealObjectRepository objrepo;
    @Inject
    RealObjectFollowshipRepository frepo;

    public void insertTestValues() throws NoSuchAlgorithmException {
        RealObject ob1 = new RealObject("Drucker", "Canon Drucker", 48.5, 14.5, "drucker.jpg");
        RealObject ob5 = new RealObject("Wolkenkratzer", "Raiffaisen Wolkenkratzer", 48, 14.25, "wolk.jpg");
        RealObject ob2 = new RealObject("Laptop", "Dell XPS 15", 48.2692366,14.2543346, "laptop.jpg");
        RealObject ob3 = new RealObject("Der Schrei", "Edvard Munch", 49, 14, "gemaelde.jpg");
        RealObject ob4 = new RealObject("Schuelervertretungsplakat", "Htl Leondings Schülervertretung", 48.2692366, 15, "sv.jpg");
        Note note1 = new Note("Laptop Bedienungsanleitung");
        Note note2 = new Note("Wie wechselt man Druckerpatronen - ein Howto");
        Note note3 = new Note("Der Schrei", "Edvard Munch war ein norwegischer Maler und Grafiker des Symbolismus. Neben über 1700 Gemälden fertigte er zahlreiche Grafiken und Zeichnungen an. Munch gilt als Bahnbrecher für die expressionistische Richtung in der Malerei der Moderne.", NoteType.TEXT);
        Note note4 = new Note("Wahlziele", "Schülerrabatte, Gutscheine, Schulpullis", NoteType.DATE);
        ob1.addNote(note2);
        ob2.addNote(note1);
        ob3.addNote(note3);
        ob4.addNote(note4);
        RealObjectFeed feed1 = new RealObjectFeed("Gebäude");
        RealObjectFeed feed2 = new RealObjectFeed("Gemälde");
        RealObjectFeed feed3 = new RealObjectFeed("Plakate");
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update("Guglhupfsalt".getBytes());
        byte[] digest = md.digest();
        String myHash = DatatypeConverter.printHexBinary(digest).toUpperCase();

        //pw is Gugelhupf
        User christopher = new User("Christopher", "Gusenbauer", "chris.gusenbauer101@gmail.com", "0231231231", myHash, "salt", Role.USER);
        User isabella = new User("Isabella", "Hundsdorfer", "is.hun@gmail.com", "0231231231", myHash, "salt", Role.USER);
        christopher.setEmailVerificationId("true");isabella.setEmailVerificationId("true");
        UserGroup hausfans = new UserGroup("Gebäudefans", "wir suchen die schönsten Gebäude");
        UserGroup druckfans = new UserGroup("Druckenthusiasten", "Vom Drucker bis Zum Plakat");
        UserGroup künstlerfans = new UserGroup("Künstlerfans", "Picasso bis zu da Vinci");
        em.persist(ob1);
        em.persist(ob2);
        em.persist(ob3);
        em.persist(ob4);
        em.persist(christopher);
        em.persist(isabella);

        RealObjectFollowship followship = new RealObjectFollowship(feed1, ob5);
        RealObjectFollowship followship2 = new RealObjectFollowship(feed2, ob3);
        RealObjectFollowship followship3 = new RealObjectFollowship(feed3, ob4);
        em.persist(followship2);
        em.persist(followship3);
        em.persist(followship);
        FeedSubscription subsc = new FeedSubscription(feed1, hausfans);
        FeedSubscription subsc2 = new FeedSubscription(feed2, künstlerfans);
        FeedSubscription subsc3 = new FeedSubscription(feed3, druckfans);
        em.persist(subsc);
        em.persist(subsc2);
        em.persist(subsc3);
        UserGroupMembership membership = new UserGroupMembership(hausfans, christopher);
        UserGroupMembership membership2 = new UserGroupMembership(druckfans, christopher);
        UserGroupMembership membership3 = new UserGroupMembership(künstlerfans, christopher);
        UserGroupMembership membership4 = new UserGroupMembership(künstlerfans, isabella);
        em.persist(membership4);
        em.persist(membership);
        em.persist(membership2);
        em.persist(membership3);
    }

    public void BeforeStoppingServer() {
        try {
            frepo.findAll().forEach((fs) -> {
                frepo.remove(fs.getId());
            });

            objrepo.findAll().forEach((fs) -> {
                objrepo.remove(fs.getId());
            });
        } catch (Exception e) {
            log.warn("Couldnt delete from Vuforia Servers" + e.getLocalizedMessage());
        }
    }

    public LoginResponse login(LoginInformation pto) {
        Query query = em.createNamedQuery("User.login", User.class);
        query.setParameter("email", pto.email);

        try {
            User b = (User) query.getSingleResult();
            //generate token
            String token = generateJWT(b);
            //check password
            if (b.isPasswordCorrect(pto.password)) {
                log.info("User" + pto.toString() + " logged in" + b.getId() + token);
                if(!b.getEmailVerificationId().equals("true")) return new LoginResponse(b.getId(),"User has not verified his Account via Email");
                return new LoginResponse(b.getId(), token);
            } else {
                log.warn("failed login");
                return null;
            }
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            return null;
        }
    }

    public String generateJWT(User b) {
        try {
            String jwt = Jwts.builder().setSubject("Login_Auth_Footnote")
                    .setId(String.valueOf(b.getId())).setExpiration(Repository.getDateAfterDays(2))
                    .claim("id", b.getId()).claim("role", b.getRole()).signWith(SignatureAlgorithm.HS256, RestCommunicationFilter.getSigningKey().getBytes("UTF-8")).compact();

            return jwt;
        } catch (UnsupportedEncodingException ex) {
            log.warn(ex.getLocalizedMessage());
        }
        return null;
    }

    public static Date getDateAfterDays(int days) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, days); // +days
        return cal.getTime();
    }

}

   



 //   return em.createQuery("SELECT g FROM UserGroup g JOIN FETCH UserGroupMembership m where g.id=m.usergroup.id and  m.user.id=:id ", UserGroup.class).setParameter("id", id).getResultList();
