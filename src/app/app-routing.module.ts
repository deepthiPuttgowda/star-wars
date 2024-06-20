import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharacterSummaryComponent } from './character-summary/character-summary.component';

const routes: Routes = [
  {path: 'Characters', component: CharactersComponent},
  {path: 'characters/:characterId', component: CharacterSummaryComponent},
  {path: '**', redirectTo: '/Characters', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
