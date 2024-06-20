import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../Services/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-summary',
  templateUrl: './character-summary.component.html',
  styleUrls: ['./character-summary.component.less']
})
export class CharacterSummaryComponent implements OnInit {
  characters: any;
  films: any = [];
  data: any = [];
  spaceships: any = [];
  constructor( private starService : CharacterService, private router : Router,) { }

  ngOnInit(): void {
    this.detailsById();
  }

  detailsById(){
    this.characters = this.starService.getCharacterDetailsById();
    let obj : any = {};
    this.films = this.characters[0].filmDetail;
    this.spaceships = this.characters[0].spaceShips;
    obj['Name'] = this.characters[0].name;
    obj['Gender'] = this.characters[0].gender;
    obj['Birth Year'] = this.characters[0].birth_year;
    obj['Created'] = this.characters[0].created;
    obj['Hair Color'] = this.characters[0].hair_color;
    obj['Eye Color'] = this.characters[0].eye_color;
    obj['Height'] = this.characters[0].height;
    obj['Mass'] = this.characters[0].mass;
    obj['Species'] = this.characters[0].species;
    this.data.push(obj);
  }

  goBack(){
    this.router.navigate(['Characters']);
  }
}
