/**
 * Renders current user's profile info and fields where users can update this info
 * @module UserUpdateFromComponent
*/

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit {
  user: any = {};

  userDetails: any = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  /**
   * Fetches user's info on page load
   * @function ngOnInit
   */
  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Gets current user from local storage
   * Fetches currents user's info from API
   * @function getUserInfo
   */
  getUserInfo(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
      });
    }
  }

  /**
   * Gets current user form local storage
   * Binds each field to different keys in user object
   * Updates user info in database with new values provided
   * Shows status in snackBar
   * Navigates to /user
   * @function submitUpdate
   */
  submitUpdate(): void {
    const user = localStorage.getItem('user');
    const updatedUserData = {
      Username: !this.userDetails.Username
        ? this.user.Username
        : this.userDetails.Username,
      Password: this.user.Password,
      Email: !this.userDetails.Email
        ? this.user.Email
        : this.userDetails.Email,
      Birthday: !this.userDetails.Birthday
        ? this.user.Birthday
        : this.userDetails.Birthday,
    }
    if (user) {
      this.fetchApiData.updateUser(updatedUserData).subscribe((response) => {
        console.log(response);
        console.log(this.userDetails);
        // localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('User Info Updated!', 'OK', {
          duration: 2000
        });
        this.router.navigate(['user']);
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }
  }

  /**
   * Gets current user form local storage
   * Removes user object from database
   * Shows status in snackBar
   * Navigates to /welcome
   * @function submitUpdate
   * @param currentUser
   */
  deleteCurrentUser(currentUser: any): void {

    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser(currentUser).subscribe((response) => {
        console.log(response);

      }, (response) => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('User Deleted!', 'OK', {
          duration: 2000
        });
      });

    }
  }

}
