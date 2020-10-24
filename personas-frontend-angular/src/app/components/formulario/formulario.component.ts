import { Persona } from './../../persona.model';
import { PersonaService } from './../../persona.service';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [],
})
export class FormularioComponent implements OnInit {
  idPersona: number;
  nombreInput: string;
  apellidoInput: string;
  exist: boolean = false;

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
    if (this.idPersona == null) {
      this.exist = true;
    }
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.idPersona = params.id;
      console.log('Persona recuperada ' + params.id);
      if (this.idPersona != null) {
        const person: Persona = this.personaService.findPerson(this.idPersona);
        if (person != null) {
          this.exist = true;
          this.nombreInput = person.nombre;
          this.apellidoInput = person.apellido;
        } else {
          this.router.navigate(['personas']);
        }
      }
    }
    ); // parametro recibido por route
  }
  onSavePerson() {
    const person = new Persona(
      this.idPersona,
      this.nombreInput,
      this.apellidoInput
    );
    if (this.idPersona != null) {
      this.personaService.editPerson(this.idPersona, person)
    } else {
      this.personaService.addPeople(person);
    }
    this.router.navigate(['personas']);
  }
  delete(id) {
    this.personaService.deletePerson(id);
    this.router.navigate(['personas']);
  }
  close() {
    this.router.navigate(['personas']);
  }

}
