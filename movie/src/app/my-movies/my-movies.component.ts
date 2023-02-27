import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent {
  constructor(private http: HttpClient) {}
  myMovies$: any
  edit: boolean = false
  @ViewChild('name') name: ElementRef | undefined
  @ViewChild('date') date: ElementRef | undefined
  @ViewChild('place') place: ElementRef | undefined
  @ViewChild('rate') rate: ElementRef | undefined
  @ViewChild('genre') genre: ElementRef | undefined
  @ViewChild('type') type: ElementRef | undefined
  @ViewChild('country') country: ElementRef | undefined
  finnalyEdit(id: string) {
    const newElement = {
      name: this.name?.nativeElement.value,
      date: this.date?.nativeElement.value,
      place: this.place?.nativeElement.value,
      rate: this.rate?.nativeElement.value,
      genre: [this.genre?.nativeElement.value],
      type: this.type?.nativeElement.value,
      country: [this.country?.nativeElement.value],
      minute : 21,
      series: null,
      
      
    }
    
    this.http.put(`http://localhost:3000/MyMovies/${id}`,newElement)
  
    this.edit = false
  }
  editButton() {
    this.edit = true
  }
  cancelEdit() {
    this.edit = false
  }
  ngOnInit() {
    this.myMovies$ = this.http.get('http://localhost:3000/MyMovies')
    
  }
  deleteMovie(id: string) {
    this.http
      .delete(`http://localhost:3000/MyMovies/${id}`)
      .subscribe(
        () =>
          (this.myMovies$ = this.http.get('http://localhost:3000/MyMovies')),
      )
  }
}
