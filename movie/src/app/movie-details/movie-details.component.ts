import { Component, ElementRef, ViewChild } from '@angular/core'
import { ApiService } from '../services/api.service'
import { Observable, filter, find, map, switchMap } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { List } from '../movie.model'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  constructor(private apiService: ApiService, private route: ActivatedRoute,private router: Router) {}
  @ViewChild('textarea') input: ElementRef | undefined
  movieList$: Observable<any> = this.apiService.getListData()
  id: any = 0
  selectedMovie$: Observable<any> | undefined
  editText: boolean = false
  value: string | undefined
  goBack(){
    this.router.navigate(['/List']);
  }

  ngOnInit() {
    this.selectedMovie$ = this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) => {
        return this.movieList$.pipe(
          map((el) => {
            return el.find((e: any) => e.id == id)
          }),
        )
      }),
    )
  }

  deleteMovie(id: string) {
    this.apiService
      .deleteData(id)
      .subscribe(() => (this.movieList$ = this.apiService.getListData()))
  }
  edit() {
    this.editText = true
  }
  editComment(id: string) {
    const value: string = this.input?.nativeElement.value
    this.apiService
      .edditData(id, { comment: value })
      .subscribe(() => {
        this.movieList$ = this.apiService.getListData()
        this.ngOnInit()
      })
 
    this.editText = false
  }
  cancelEdit() {
    this.editText = false
  }
}
