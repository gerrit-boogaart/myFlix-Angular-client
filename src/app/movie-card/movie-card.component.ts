import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  setFavoriteStatus(movieId: any): any {
    if (this.user.favorites.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user.favorites = resp.FavoriteMovies;
      console.log(this.user.favorites);
    });
  }

  favoriteMovie(_id: string): void {
    const userFavorites = this.user.favorites;
    // searches array and deletes favorite if movie id already exists
    if (userFavorites.includes(_id)) {
      this.fetchApiData.deleteFavorite(_id).subscribe((resp: any) => {
        this.user.favorites = resp.FavoriteMovies;
        console.log(this.user.favorites)
        return this.user.favorites;
      });
      this.snackBar.open('Removed from your favorites!', 'OK', {
        duration: 2000
      });
    } else {
      // add favorite if movie id not present in array
      this.fetchApiData.addFavorite(_id).subscribe((resp: any) => {
        this.user.favorites = resp.FavoriteMovies;
        console.log(this.user.favorites)
        return this.user.favorites;
      })
      this.snackBar.open('Added to your favorites!', 'OK', {
        duration: 2000
      });
    }

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
