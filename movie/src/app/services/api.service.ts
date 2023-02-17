import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { List } from '../movie.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}


  getMovieData(name: string) {
    return this.http.get(`http://www.omdbapi.com/?t=${name}&apikey=abf03079`);
  }
  getCountrieData(country: string){
    return this.http.get(`https://restcountries.com/v3.1/name/${country}`)
  }
  getListData(){
    return this.http.get(`http://localhost:3000/movies`)
  }
  addData(body:List){
    return this.http.post(`http://localhost:3000/movies`,body)
  }
}
