import { FormularioComponent } from './../formulario/formulario.component';
import { PersonaService } from './../../persona.service';
import { Persona } from './../../persona.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];
  constructor(private personaService: PersonaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.personaService.allPeople().subscribe((personasObtenidas: Persona[]) => {
      // se obtienen las personas
      const params = JSON.stringify(personasObtenidas);
      this.personas = personasObtenidas;
      this.personaService.setPeople(this.personas);
      console.log('Personas obtenidas del subscriber' + params);
    });
  }
  goAdd(): any {
    console.log('Go Add');
    this.router.navigate(['./personas/add']);
  }
}
