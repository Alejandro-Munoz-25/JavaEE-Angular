import { FormularioComponent } from './components/formulario/formulario.component';
import { PersonasComponent } from './components/personas/personas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PersonasComponent },
  {
    path: 'personas', component: PersonasComponent, children: [
      { path: 'add', component: FormularioComponent },
      { path: ':id', component: FormularioComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
