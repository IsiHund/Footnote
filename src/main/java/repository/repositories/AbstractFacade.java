/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository.repositories;

import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.WebApplicationException;
import org.apache.log4j.Logger;

/**
 *
 * @author Christopher
 */
public abstract class AbstractFacade<T> {

    @PersistenceContext(unitName = "MYSQLPU")
    public EntityManager em;

    @Inject
    Logger log;

    private final Class<T> entityClass;
    private  Class<T> parentClass;
 private  Class<T> helperClass;
    public AbstractFacade(Class<T> entityClass, Class<T> parentClass,Class<T> helperClass) {
        this.entityClass = entityClass;
        this.parentClass = parentClass;
        this.helperClass=helperClass;
    }

    public AbstractFacade(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    @PostConstruct
    private void init() {
        log.info("em=" + em.toString());
    }

    protected EntityManager getEntityManager() {
        return em;
    }

    public T create(T entity) {
        this.getEntityManager().persist(entity);
        log.debug("created entity" + entity.toString());
        return entity;
    }

    public T edit(T entity) {
        entity = getEntityManager().merge(entity);
        log.debug("edited entity" + entity.toString());
        return entity;
    }

    public void remove(Object id) {
        T entity = getEntityManager().find(entityClass, id);
        if (entity == null) {
            throw new NotFoundException("Entity doesnt Exist");
        } else {
            getEntityManager().remove(entity);
        }
        log.debug("deleted entity" + entity.toString());
    }

    public T find(Object id) {
        T entity = getEntityManager().find(entityClass, id);
        if (entity == null) {
            throw new NotFoundException();
        }
        return entity;
    }

    public List<T> findAll() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public List<T> findRange(int[] range) {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        q.setMaxResults(range[1] - range[0] + 1);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        javax.persistence.criteria.Root<T> rt = cq.from(entityClass);
        cq.select(getEntityManager().getCriteriaBuilder().count(rt));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

}
