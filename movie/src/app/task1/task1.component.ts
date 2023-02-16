import { Component } from '@angular/core'
import { Observable, filter, forkJoin, map } from 'rxjs'
import { Movie } from '../movie.model'
import { HttpClient } from '@angular/common/http'
import { Currency } from '../movie.model'


@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss'],
})
export class Task1Component {
  constructor(private http: HttpClient) {}

  movieName: string = ''
  movieInfo$: Observable<Movie> | undefined
  movieCountry: string = ''
  countryInfo$: Observable<{ name: string; symbol: string }> | undefined

  getMovieInfo() {
    this.movieInfo$ = this.http
      .get(`http://www.omdbapi.com/?t=${this.movieName}&apikey=abf03079`)
      .pipe(
        map((data: any) => {
          let aboutMovie: Movie
          aboutMovie = {
            yearReleased: new Date().getFullYear() - parseInt(data.Year),
            actorNames: data.Actors.split(',')
              .map((actor: any) => actor.trim().split(' ')[0])
              .join(', '),
            countries: data.Country.split(','),
            currencies : []
          }
          const currencyRequests = aboutMovie.countries.map((country: string) => {
            return this.http
              .get(`https://restcountries.com/v3.1/name/${country}`)
          });
          forkJoin(currencyRequests).subscribe((currencyResponses: any) => {
            currencyResponses.map((countryData: any) => {
              const currency = {
                name: Object.keys(countryData[0].currencies)
              };
              console.log(currency.name)
              aboutMovie.currencies.push(currency);
            });
          });
  

          return aboutMovie;
        })
      );
    this.movieInfo$.subscribe((x)=>console.log(x))
}
   
  }

function ngOnInit() {
  throw new Error('Function not implemented.')
}
