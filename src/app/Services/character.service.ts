import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  SWAPI_BASE_URL : any = 'https://swapi.dev/api/';
  item: any;
  array: any;

  constructor(private http: HttpClient) { }

  getCharacterList() : Observable<any>{
    let url = `${this.SWAPI_BASE_URL}/people/`
    return this.http.get(url);
  }

  getSpecies(species : any) : Observable<any>{
    return this.http.get(species);
  }

  getFilmList(film : any): Observable<any>{
    return this.http.get(film);
  }

  setCharacterById(item : any){
    this.item = item
  }

  getCharacterDetailsById(){
    return this.item;
  }

  setFilms(array : any){
    this.array = array
  }

  getFilms(){
    return this.array;
  }

  getStarship(item : any): Observable<any>{
    return this.http.get(item);
  }
}
