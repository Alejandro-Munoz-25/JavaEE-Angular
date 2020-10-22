package service;

import data.PersonaDao;
import domain.Persona;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

/**
 *
 * @author aleja
 */
@Stateless
@Path("/personas")
public class PersonaServiceRS {

    @Inject
    private PersonaDao personaDao;

    @GET
    @Produces(value = MediaType.APPLICATION_JSON)
    public List<Persona> listOfPoeple() {
        List<Persona> people = personaDao.findAll();
        System.out.println("people = " + people);
        return people;
    }

    @GET
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Persona personById(@PathParam("id") int id) {
        Persona findP = personaDao.findByID(new Persona(id));
        System.out.println("people find = " + findP);
        return findP;
    }

    @POST
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    public Persona addPerson(Persona person) {
        personaDao.savePerson(person);
        System.out.println("people find = " + person);
        return person;
    }

    @PUT
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response editPerson(@PathParam("id") int id, Persona personEdit) {
        Persona people = personaDao.findByID(new Persona(id));
        if (people != null) {
            personaDao.editPerson(personEdit);
            System.out.println("people = " + personEdit);
            return Response.ok().entity(personEdit).build();
        } else {
            return Response.status(Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response removePerson(@PathParam("id") int id) {
        Persona people = personaDao.findByID(new Persona(id));
        if (people != null) {
            personaDao.deletePerson(people);
            System.out.println("people = " + people);
            return Response.ok().entity(people).build();
        } else {
            return Response.status(Status.NOT_FOUND).build();
        }
    }

}
