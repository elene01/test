import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Task1Component } from './task1/task1.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { Task2Component } from './task2/task2.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    Task1Component,
    FavoriteMoviesComponent,
    MovieDetailsComponent,
    Task2Component,
    AddMovieComponent,
    MyMoviesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
