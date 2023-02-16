import { Component } from '@angular/core'
import { Observable, forkJoin, map, switchMap } from 'rxjs'
import { Movie } from '../movie.model'
import { HttpClient } from '@angular/common/http'

import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss'],
})
export class Task1Component {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  movieName: string = ''
  movieInfo$: Observable<Movie> | undefined
  movieCountry: string = ''
  countryInfo$: Observable<{ name: string; symbol: string }> | undefined

  getMovieInfo() {
    this.movieInfo$ = this.apiService.getMovieData(this.movieName).pipe(
      switchMap((data: any) => {
        const aboutMovie: Movie = {
          title: data.Title,
          yearReleased: new Date().getFullYear() - parseInt(data.Year),
          actorNames: data.Actors.split(',')
            .map((actor: any) => actor.trim().split(' ')[0])
            .join(', '),
          countries: data.Country.split(',').map((e: string) => e.trim()),
          currencies: [],
        }
        const currencyRequests = aboutMovie.countries.map((country: string) => {
          return this.apiService.getCountrieData(country)
        })

        return forkJoin(currencyRequests).pipe(
          map((currencyResponses: any) => {
            aboutMovie.currencies = currencyResponses.map(
              (countryData: any) => {
                console.log(countryData)
                return {
                  name: Object.keys(countryData[0].currencies),
                  flags: countryData[0].flags.png,
                }
              },
            )

            return aboutMovie
          }),
        )
      }),
    )
    this.movieInfo$.subscribe((x) => console.log(x))
  }
}

function ngOnInit() {
  throw new Error('Function not implemented.')
}
