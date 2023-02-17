import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, filter, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  constructor( private apiService: ApiService,private route: ActivatedRoute) {}
  movieList$: Observable<any> = this.apiService.getListData()
  id: any = 0;
  selectedMovie = this.movieList$.pipe(map((el)=> {return el.filter((e:any) => e.id == this.id)})).subscribe()
rame:any

  ngOnInit() {
 this.route.params.subscribe(params => {
      this.id = params['id']
    });
  
    this.rame = this.route.snapshot.paramMap.get('item')

   console.log(this.rame)
  }


}
