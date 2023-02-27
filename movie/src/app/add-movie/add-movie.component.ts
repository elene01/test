import { Component } from '@angular/core'
import { Genre, MyMovie, Type } from '../movie.model'
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { Observable, map } from 'rxjs'
import { ApiService } from '../services/api.service'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  genre = Genre
  type = Type
  contries: Observable<string[]> | undefined
  form: FormGroup<MyMovie> = this.buildForm()
  typeIsMovie: boolean = false
  typeIsTvShow: boolean = false
  isSubmitted: boolean = false
  myMovies$: any
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
  ) {}

  checkNames() {
    return (control: AbstractControl) => {
      this.myMovies$ = this.http
        .get('http://localhost:3000/MyMovies')
        .pipe(map((el: any) => el.map((e: any) => e.name)))
        .subscribe((x: any) => {
          console.log(x)
          x.map(() => {
            if (x.name == this.form.value.name) {
              console.log('ie')
              return { nameExist: x.name }
            } else {
              return null
            }
          })
        })
    }
  }

  validateDate(control: AbstractControl) {
    const inputDate = new Date(control.value)
    const currentDate = new Date()
    if (inputDate < currentDate) {
      return { invalidDate: true }
    }
    return null
  }

  getAllCountry(): Observable<string[]> {
    return this.http.get(`https://restcountries.com/v3.1/all`).pipe(
      map((response) => Object.values(response)),
      map((countries) => countries.map((country) => country.name.common)),
    )
  }

  private buildForm() {
    return new FormGroup<MyMovie>({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      place: new FormControl(''),
      date: new FormControl(null, [Validators.required, this.validateDate]),
      country: new FormArray([new FormControl(null)], Validators.required),
      Action: new FormControl(false),
      Comedy: new FormControl(false),
      Drama: new FormControl(false),
      History: new FormControl(false),
      Documentary: new FormControl(false),
      Animation: new FormControl(false),
      type: new FormControl(null),
      rate: new FormControl(0),
      movieMinutes: new FormControl(null),
      seriesNumber: new FormControl(null),
    })
  }
  typeMovie() {
    this.typeIsMovie = true
    this.typeIsTvShow = false
  }
  typeSerial() {
    this.typeIsTvShow = true
    this.typeIsMovie = false
  }

  submit() {
    this.isSubmitted = true

    if (this.form.status == 'VALID') {
      const values = this.form.value

      const genre: string[] = []
      if (values.Action) {
        genre.push('Action')
      }

      if (values.Animation) {
        genre.push('Animation')
      }

      if (values.Documentary) {
        genre.push('Documentary')
      }
      if (values.Drama) {
        genre.push('Drama')
      }
      if (values.History) {
        genre.push('History')
      }
      if (values.Comedy) {
        genre.push('Comedy')
      }
      const result = {
        name: values.name,
        contry: values.country,
        place: values.place,
        type: values.type,
        minutes: values.movieMinutes,
        series: values.seriesNumber,
        date: values.date,
        genres: genre,
        rate: values.rate,
      }
this.router.navigate([''])
      this.http
        .post(`http://localhost:3000/MyMovies`, result)
        .subscribe((c) => c)
    }
  }
  contryControl() {
    const countries: any = this.form.controls.country

    countries?.push(new FormControl(''))
  }
  ngOnInit(control: AbstractControl) {
    this.contries = this.getAllCountry()
  }
}
