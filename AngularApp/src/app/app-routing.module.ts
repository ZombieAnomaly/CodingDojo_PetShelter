import { PetsComponent } from './pets/pets.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'PetsApp/',component: PetsComponent },
  { path: 'PetsApp/new',component: NewPetComponent },
  { path: 'PetsApp/:id', component: PetDetailsComponent },
  { path: 'PetsApp/:id/edit',component: EditPetComponent },
  { path: '**', component: PetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
