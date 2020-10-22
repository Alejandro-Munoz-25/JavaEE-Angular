/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import domain.Persona;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.*;

/**
 *
 * @author aleja
 */
@Stateless
public class PersonaDaoImp implements PersonaDao {

    @PersistenceContext(unitName = "PersonaPu")
    EntityManager em;

    @Override
    public List<Persona> findAll() {
        return em.createNamedQuery("Persona.findAll").getResultList();
    }

    @Override
    public Persona findByID(Persona persona) {
        return (Persona) em.createNamedQuery("Persona.findByIdPersona").getParameterValue(persona.getIdPersona());
    }

    @Override
    public void savePerson(Persona persona) {
        em.persist(persona);
        em.flush();
    }

    @Override
    public void editPerson(Persona persona) {
        em.merge(persona);
    }

    @Override
    public void deletePerson(Persona persona) {
        em.remove(em.merge(persona));
    }

}
