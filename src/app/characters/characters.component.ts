import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../Services/character.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl }  from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.less']
})

export class CharactersComponent implements OnInit {
  displayedColumns : any = [];
  dataSource : any;
  response: any;
  characterList: any = [];
  filmsArray: any = [];
  count = 0;
  filteredArray: any;
  panelOpenState = false;
  Movies = ['A New Hope'];
  year = ['19BBY'];
  species = ['Human'];
  MovieValue: any;
  speciesValue: any;
  yearValue: any;
  speciesInitial = '';
  yearInitial = '';
  movieInitial = '';
  movie: string[]=['All','A New Hope'];
  years: string[]=['All','19BBY'];
  Species: string[]=['All','Human'];
  formControl!: AbstractControl;
  defaultValue = "All";
  filterDictionary= new Map<string,string>();
  dataSourceFilters: any;
  characterListCopy: any;
  filmdata: any;
  yearFilter: any;
  speciesFilter: any;
  isLoaded: boolean = false;
  showFilter: boolean = false;
  

  constructor(
    private starService : CharacterService,
    private router : Router,
    private builder : FormBuilder
  ) { }

  ngOnInit(): void {
     this.displayedColumns = ['SLNo.', 'CharacterName', 'Species', 'Birth_Year'];
     this.getCharactersData();   
  }


  getCharactersData(){
    this.starService.getCharacterList().subscribe((res)=>{
      this.isLoaded = true;
      this.response = res;
      this.characterList = this.response?.results
      this.characterListCopy = this.characterList;
      let species: any = [], films: any = [], spaceShipDetails : any = [];
      this.characterList.forEach((element : any, index : number) => {
        element.slNo = index + 1;
        species = element.species;
        if(species.length == 0) element.species = "Human";
        else{
          this.starService.getSpecies(species[0]).subscribe((res)=>{
            element.species = res.name;
          })
        }
        films = element.films
        let filmArray: any[] = [], filmDetails: any = [], starShips : any = [] ;
        films.forEach((item : any)=>{
          filmArray = []; filmDetails = [];
          this.starService.getFilmList(item).subscribe((res)=>{
            filmArray.push(res.title);
            filmDetails.push(res);
          })
        });
        element.films = filmArray;
        element.filmDetail = filmDetails;
        spaceShipDetails = element.starships;
        if(spaceShipDetails != undefined){
          spaceShipDetails.forEach((item: any) => {
            starShips = [];
            this.starService.getStarship(item).subscribe((res:any)=>{
              starShips.push(res)
            })
          })
          element.spaceShips = starShips;
        }
      });
      this.dataSource = this.characterList;
    });
  }

  onMovieChange(event : any){
    if(event.value != ""){
      let filtered = this.characterList.filter((res : any)=>{
        return res.films.includes(event.value) 
      })
      // this.speciesFilter = filtered;
      this.characterList = filtered;
      this.dataSource = this.characterList;
      console.log(this.dataSource,"source");
    }
    else{
      this.dataSource = this.characterListCopy;
    }
  }

  onSpeciesChange(event : any){
    let characterCopy = this.characterList
    if(event.value != ""){
      let filtered = this.characterList.filter((res : any)=>{
        return res.species == event.value
      })
      this.speciesFilter = filtered;
      this.characterList = filtered;
      this.dataSource = this.characterList
    }
    else{
      this.dataSource = this.characterListCopy;
    }

    console.log(this.dataSource,"source");

  }

  onYearChange(event : any){
    if(event.value != ""){
      let filtered = this.characterList.filter((res : any)=>{
        return res.birth_year == event.value
      })
      this.yearFilter = filtered;
      this.characterList = filtered;
      this.dataSource = this.characterList;
    }
    else{
      this.dataSource = this.characterListCopy;
    }
    console.log(this.dataSource,"source");
  }

  clearFilter(){
    this.dataSource = this.characterListCopy;
    this.yearInitial = '';
    this.speciesInitial = '';
    this.movieInitial = '';
  }

  CharacterDetails(rowData: any){
    this.filteredArray = this.characterListCopy.filter((item : any) => {
      return item.slNo == rowData.slNo;
    });
    this.starService.setCharacterById(this.filteredArray);
    this.router.navigate(['characters' , rowData.slNo]);
  }

  openFilter(){
    this.showFilter = true;
  }

}
