/**
 * Connects application to API and its endpoints
 * @module FetchApiDataService
 */

import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://dcampbellcreative-movie-api.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  /**
   * Calls API end point to register a new user
   * @function userRegistration
   * @param userDetails
   * @returns new user object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Calls API end point for existing user to login
   * @function Login
   * @param userDetails
   * @returns user object
   */
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

  /**
   * Checks local storage for user token
   * Fetches all movies from API end point
   * @function getAllMovies
   * @returns array of movie objects and their info
   */
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

  /**
    * Gets user token from local storage
    * Fetches all movies from API end point
    * @function getUser
    * @returns user object
    */
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

  /**
   * Gets user token from local storage
   * Puts updated user info into API end point
   * @function updateUser
   * @returns updated user object
   */
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


  /**
  * Gets user token from local storage
  * Deletes user object from API end point
  * @function deletesUser
  * @returns removed userObject
  */
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

  /**
   * Gets user token from local storage
   * Gets userObject from local storage
   * Adds favorite to userId at API end point
   * @function addFavorite
   * @param movieId
   * @returns array of user's favorite movies
   */
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

  /**
   * Gets user token from local storage
   * Gets userObject from local storage
   * Removes favorite movie's userId at API end point
   * @function deleteFavorite
   * @param movieId
   * @returns array of user's favorite movies
   */
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

  /**
   * Shows message in case of error
   * @function handleError
   * @param error 
   * @returns error status
   */
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

