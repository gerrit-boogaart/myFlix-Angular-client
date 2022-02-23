/**
 * Renders navigation bar using paths from app.module.ts
 * @module NavigationBarComponent
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  loggedIn = false;
  currentUrl = this.router.url;
  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Checks if user token exists in local storage
   * @function ngDoCheck
   */
  ngDoCheck(): void {
    const token = localStorage.getItem('token')
    if (token) this.loggedIn = true;
  }

  /**
   * Navigates to /user 
   * @function navigateUserProfile
   */
  navigateUserProfile(): void {
    this.router.navigate(['user']);
  }

  /**
   * Navigates to /movies 
   * @function navigateMovies
   */
  navigateMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Logs out current user
   * Clears local storage
   * Navigates to /welcome
   * @function userLogout
   */
  userLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      this.loggedIn = false;
      this.router.navigate(['welcome']);
      this.snackBar.open('User Logged Out', 'OK', {
        duration: 2000
      });
    }
  }

}
