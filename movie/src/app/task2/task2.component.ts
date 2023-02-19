import { Component } from '@angular/core'
import { ApiService } from '../services/api.service'
import { forkJoin, map } from 'rxjs'

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
})
export class Task2Component {
  constructor(private apiService: ApiService) {}
  movie1: string = ''
  movie2: string = ''
  movie3: string = ''
  totalRuntime: number = 0

  search() {
    const movies = [this.movie1, this.movie2, this.movie3]
    const movieInfo$ = movies.map((movie) =>
      this.apiService.getMovieData(movie),
    )

    forkJoin(movieInfo$)
      .pipe(
        map((responses: any[]) => {
          const runtimes = responses.map((response) =>
            parseInt(response['Runtime']),
          )
          return runtimes.reduce((a, b) => a + b, 0)
        }),
      )
      .subscribe((totalRuntime: number) => {
        this.totalRuntime = totalRuntime
      })

    
  }
}
