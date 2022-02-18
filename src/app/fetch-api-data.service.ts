import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieCardComponent } from './movie-card/movie-card.component';

const apiUrl = 'https://dcampbellcreative-movie-api.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  // register new user
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // login existing user
  public Login(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // get list of all movies 
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get movie by title
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get genre by name
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get director by name
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get all users
  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get user by username
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // take first true value 
    const user = localStorage.getItem('user') || "{}";
    const userObject = JSON.parse(user);
    return this.http.get(apiUrl + 'users/' + userObject.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // edit user by username
  updateUser(updatedUserData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') || "{}";
    const userObject = JSON.parse(user);
    return this.http.put(apiUrl + 'users/' + userObject.Username, updatedUserData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // delete user by username
  deleteUser(currentUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') || "{}";
    const userObject = JSON.parse(user);
    return this.http.delete(apiUrl + 'users/' + userObject.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // add movie to user favorites
  addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') || "{}";
    const userObject = JSON.parse(user);
    return this.http.post(apiUrl + 'users/' + userObject.Username + '/movies/' + movieId, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // add movie to user favorites
  deleteFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') || "{}";
    const userObject = JSON.parse(user);
    return this.http.put(apiUrl + 'users/' + userObject.Username + '/movies/' + movieId, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error ocurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later'
    );
  }
}

