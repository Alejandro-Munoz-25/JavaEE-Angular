import { Persona } from './persona.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) { }
  urlBase = 'http://localhost:8080/personas-backend/webservice/personas';

  loadPeople(): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.get(this.urlBase, { headers });
  }
  storagePerson(person: Persona): any {
    return this.httpClient.post(this.urlBase, person);
  }
  editPerson(idPersona: number, person: Persona) {
    let url: string;
    url = this.urlBase + '/' + idPersona;
    const params = JSON.stringify(person);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.put(url, params, { headers }).subscribe(
      (response) => {
        console.log('Resultado de Modificar Persona: ' + JSON.stringify(response));
      },
      (error) => {
        console.log('Error en EditPerson: ' + error);
      }
    );
  }
  deletePerson(idPersona: number) {
    let url: string;
    url = this.urlBase + '/' + idPersona;
    this.httpClient.delete(url).subscribe(
      (response) => {
        console.log('Resultado de Eliminar Persona: ' + response);
      },
      (error) => {
        console.log('Error en deletePerson: ' + error);
      }
    );
  }
}
