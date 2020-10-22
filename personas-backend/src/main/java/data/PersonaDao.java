/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import domain.Persona;
import java.util.List;

/**
 *
 * @author aleja
 */
public interface PersonaDao {

    public List<Persona> findAll();

    public Persona findByID(Persona persona);

    public void savePerson(Persona persona);

    public void editPerson(Persona persona);

    public void deletePerson(Persona persona);

}
