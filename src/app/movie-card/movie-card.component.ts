import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birth },
      width: '500px'
    });
  }

  openSynopsisDialog(title: string, director: string, description: string,): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, director, description },
      width: '500px'
    });
  }

}
