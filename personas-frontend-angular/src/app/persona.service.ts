import { DataService } from './data-service';
import { Persona } from './persona.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PersonaService {
  people: Persona[] = [];
  constructor(private dataService: DataService) { }
  setPeople(people: Persona[]): any {
    this.people = people;
  }

  allPeople() {
    return this.dataService.loadPeople();
  }

  addPeople(person: Persona): any {
    console.log('Persona a agregar: ' + person.nombre);
    this.dataService.storagePerson(person)
      .subscribe((personSto: Persona) => {
        // se recupera el objeto Persona con el id recien agregado
        console.log('Se agrego al arreglo la persona insertada con metodo subscribe ,id= ' + personSto.idPersona);
        this.people.push(personSto);
      }, (error: any) => console.log('Ocurrio un error ' + error)
      );
  }
  findPerson(id: number): any {
    const person: Persona = this.people.find(personfind => personfind.idPersona == id);
    if (person) {
      console.log('Persona encontrada ' + person.idPersona + ' ' + person.nombre + person.apellido);
      return person;
    }
  }
  editPerson(id: number, persona: Persona): any {
    console.log('Persona a modificar ' + persona.idPersona);
    const personLocal: Persona = this.people.find(personfind => personfind.idPersona == id);
    personLocal.idPersona = persona.idPersona;
    personLocal.nombre = persona.nombre;
    personLocal.apellido = persona.apellido;
    this.dataService.editPerson(id, persona);
  }
  deletePerson(id: number): any {
    console.log('Eliminar persona ' + id);
    const index = this.people.findIndex(person => person.idPersona === id);
    this.people.splice(index, 1);
    this.dataService.deletePerson(id);
  }
}
