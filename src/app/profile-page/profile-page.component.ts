/**
 * Renders current user's profile info
 * @module ProfilePageComponent
*/

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
  ) { }

  /**
   * Fetches user's info on page load
   * @function ngOnInit
   */
  ngOnInit(): void {
    this.getUserInfo()
  }

  /**
   * Navigate to /update
   * @function navigateUpdateProfile
   */
  navigateUpdateProfile(): void {
    this.router.navigate(['update']);
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
}
