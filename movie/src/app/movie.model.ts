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
