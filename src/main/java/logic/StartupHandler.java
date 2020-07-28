/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logic;

import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Destroyed;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import repository.repositories.Repository;

/**
 *
 * @author Christopher
 */
@ApplicationScoped
public class StartupHandler {

    @Inject
    Repository repo;
    @Inject
    org.apache.log4j.Logger log;

    private void init(@Observes @Initialized(ApplicationScoped.class) Object object) {
        try {
            log.info("Booting Footnote");
            log.info("Inserting Test Values into DB");
            repo.insertTestValues();
            log.info("Done Inserting Test Values into DB");
        } catch (Exception ex) {
            log.error("Inserting Test Values failed" + ex.getLocalizedMessage());
        }
    }
    public void destroy(@Observes @Destroyed(ApplicationScoped.class) Object init) {
        log.info("Clearing up Vuforia Servers on Shutdown");
        repo.BeforeStoppingServer();
    }
}
