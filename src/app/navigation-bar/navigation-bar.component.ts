import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  navigateUserProfile(): void {
    this.router.navigate(['user']);
  }

  userLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      this.snackBar.open('User Logged Out', 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome']);
    }
  }

}
