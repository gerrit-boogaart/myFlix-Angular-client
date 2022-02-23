/**
 * Renders list of movies from API with links to dialogs containing specific info about each
 * Allows user to add or remove movies from their favorite
 * @module MovieCardComponent
*/

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

  /**
   * Fetches list of movies and user favorites on page load
   * @function ngOnInit
   * */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Fetches data on all movies from API
   * @function getAllMovies
   * @return movie data from API
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Checks wether movieId is included in user's favorites
   * @function setFavoriteStatus
   * @param movieId 
   * @return boolean
   */
  setFavoriteStatus(movieId: any): any {
    if (this.user.favorites.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Fetches list of user's favorite movies
   * @function getFavoriteMovies
   * @return list of movieId's for movies user has favorited
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user.favorites = resp.FavoriteMovies;
      console.log(this.user.favorites);
    });
  }

  /**
   * Allows user to add/remove movie from favorites
   * Searches favorites array for movieId
   * If movieId is already in user's favorites clicking on icon will remove it
   * If movieId is not in user's favorites clicking on icon will add it
   * Opens snackBar to show status based on conditional 
   * @function favoriteMovie 
   * @param _id 
   */
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

  /**
   * Passes data about movie genre to GenreCardComponent
   * Opens dialog displaying this data
   * @function openGenreDialog
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px'
    });
  }

  /**
   * Passes data about movie director to DirectorCardComponent
   * Opens dialog displaying this data
   * @function openDirectorDialog
   * @param name 
   * @param bio 
   * @param birth 
   */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birth },
      width: '500px'
    });
  }

  /**
   * Passes data about movie synopsis to SynopsisCardComponent
   * Opens dialog displaying this data
   * @function openSynopsisDialog
   * @param title 
   * @param director 
   * @param description 
   */
  openSynopsisDialog(title: string, director: string, description: string,): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, director, description },
      width: '500px'
    });
  }

}
