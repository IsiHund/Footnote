/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import entity.RealObject;
import entity.RealObjectFeed;
import entity.User;
import entity.UserGroup;
import entity.UserGroupMembership;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;
import java.util.Random;
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
import org.apache.log4j.Logger;

/**
 *
 * @author Christopher
 */
@Stateless
public class UserRepository extends AbstractFacade<User> {
 @Inject
    RealObjectRepository objectrepo;
    @Inject
    RealObjectFeedRepository feedrepo;
    
    @Inject
    Logger log;
    public UserRepository() {
        super(User.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public List<UserGroup> getUsersGroups(long id) {
        List<UserGroupMembership> ugms = em.createQuery("SELECT g FROM UserGroupMembership g where g.user.id=:id ", UserGroupMembership.class).setParameter("id", id).getResultList();
        return ugms.stream().map(g -> g.getUsergroup()).collect(Collectors.toList());
    }

    public List<RealObjectFeed> getUserFeeds(long id) {
 List<RealObjectFeed> feeds = new LinkedList<>();
        getUsersGroups(id).forEach((UserGroup ug) -> {
            feedrepo.findRealObjectFeedsbyUsergroup(ug.getId()).stream().filter((feed) -> (!feeds.contains(feed))).forEachOrdered((feed) -> {
                feeds.add(feed);
            });
        });
        return feeds;
    }

    public List<RealObject> getUsersRealObjects(long id) {
 List<RealObjectFeed> feeds = new LinkedList<>();
        List<RealObject> objs = new LinkedList<>();
        for (UserGroup ug : getUsersGroups(id)) {
            feedrepo.findRealObjectFeedsbyUsergroup(ug.getId()).stream().filter((feed) -> (!feeds.contains(feed))).map((feed) -> {
                feeds.add(feed);
                return feed;
            }).forEachOrdered((feed) -> {
                objectrepo.findRealObjectbyFeed(feed.getId()).stream().filter((obj) -> (!objs.contains(obj))).forEachOrdered((obj) -> {
                    objs.add(obj);
                });
            });
        }

        return objs;
    }
    
    @Override
  public void remove(Object id) {
        

  
        int count = getEntityManager().createNamedQuery("UserGroupMembership.deletebyUser").setParameter("id", id).executeUpdate();
        
        super.remove(id);
    }
  
public void sendFromGMail(String from, String pass, String[] to, String subject, String body) {
        Properties props = System.getProperties();
        String host = "smtp.gmail.com";
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", from);
        props.put("mail.smtp.password", pass);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props);
        MimeMessage message = new MimeMessage(session);

        try {
            message.setFrom(new InternetAddress(from));
            InternetAddress[] toAddress = new InternetAddress[to.length];

            // To get the array of addresses
            for( int i = 0; i < to.length; i++ ) {
                toAddress[i] = new InternetAddress(to[i]);
            }

            for( int i = 0; i < toAddress.length; i++) {
                message.addRecipient(Message.RecipientType.TO, toAddress[i]);
            }

            message.setSubject(subject);
            message.setText(body);
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        }
        catch (AddressException ae) {
            log.warn(ae);
        }
        catch (MessagingException me) {
           log.warn(me);
        }
    }
public String getSaltString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 18) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;

    }
public void verifyUser(String param) {
    User u = this.getEntityManager().createNamedQuery("User.findByEmail",User.class).setParameter("email", param).getSingleResult();
    u.setEmailVerificationId("true");
}
}
