import { Component } from '@angular/core'
import { Observable, forkJoin, map, switchMap } from 'rxjs'
import { List, Movie } from '../movie.model'
import { HttpClient } from '@angular/common/http'

import { ApiService } from '../services/api.service'
import { FormControl, isFormControl } from '@angular/forms'

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
  showForm: boolean = false
  ratingcontrol = new FormControl(0)
  movieList$: Observable<any> = this.apiService.getListData()
  comment: string = ''
  toAdd: List | undefined
  ngOnInit() {}

  addToList(movie: any) {
    this.toAdd = {
      comment: this.comment,
      rate: this.ratingcontrol.value,
      movieInfo: movie,
    }

    this.apiService.addData(this.toAdd).subscribe((c) => console.log(c))
    this.movieList$ = this.apiService.getListData()
  }

  addComment() {
    this.showForm = true
  }
  ratingValue() {
    this.ratingcontrol.value
  }

  getMovieInfo() {
    this.movieInfo$ = this.apiService.getMovieData(this.movieName).pipe(
      switchMap((data: any) => {
        console.log(data)
        const aboutMovie: Movie = {
          title: data.Title,
          yearReleased: new Date().getFullYear() - parseInt(data.Year),
          actorNames: data.Actors.split(',')
            .map((actor: any) => actor.trim().split(' ')[0])
            .join(', '),
          poster: data.Poster,
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
  }
}

function ngOnInit() {
  throw new Error('Function not implemented.')
}
