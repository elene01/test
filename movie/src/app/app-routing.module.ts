import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Task1Component } from './task1/task1.component'
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component'
import { MovieDetailsComponent } from './movie-details/movie-details.component'
import { Task2Component } from './task2/task2.component'
import { AddMovieComponent } from './add-movie/add-movie.component'
import { MyMoviesComponent } from './my-movies/my-movies.component'

const routes: Routes = [
  {
    path: '',
    component: Task1Component,
  },
  {
    path: 'List',
    component: FavoriteMoviesComponent,
  },
  {
    path: 'List/:id',
    component: MovieDetailsComponent,
  },
  {
    path: 'Task2',
    component: Task2Component,
  },
  {
    path: 'addMovie',
    component: AddMovieComponent,
  },
  {
    path: 'myMovies',
    component: MyMoviesComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
