import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Task1Component } from './task1/task1.component'
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component'
import { MovieDetailsComponent } from './movie-details/movie-details.component'

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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
