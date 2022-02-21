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

  ngDoCheck(): void {
    const token = localStorage.getItem('token')
    if (token) this.loggedIn = true;
  }

  navigateUserProfile(): void {
    this.router.navigate(['user']);
  }

  navigateMovies(): void {
    this.router.navigate(['movies']);
  }

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
