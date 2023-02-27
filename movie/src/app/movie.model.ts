import { FormArray, FormControl } from '@angular/forms'
import { Action } from 'rxjs/internal/scheduler/Action'

export interface Movie {
  yearReleased: number
  actorNames: string
  countries: string[]
  currencies: any
  title: string
  poster: string
}
export interface List {
  rate: number | null
  comment: string

  movieInfo: {
    yearReleased: number
    actorNames: string
    countries: string[]
    currencies: any
    title: string
  }
}
export interface MyMovie {
  name: FormControl<string | null>
  place: FormControl<string | null>
  date: FormControl<Date | null>
  country: FormArray<FormControl<any>>
  Action: FormControl<boolean | null>

  Comedy: FormControl<boolean | null>
  Drama: FormControl<boolean | null>
  History: FormControl<boolean | null>

  Documentary: FormControl<boolean | null>


  Animation: FormControl<boolean | null>

  movieMinutes: FormControl<number | null>
  seriesNumber: FormControl<number | null>
  type: FormControl<Type | null>
  rate: FormControl<number | null>
}
export enum Genre {
  Action = 'Action',
  Comedy = 'Comedy',
  Drama = 'Drama',
  History = 'History',
  Family = 'Family',
  Animation = 'Animation',
}

export enum Type {
  Movie = 'Movie',
  TvShow = 'Tv-Show',
}
