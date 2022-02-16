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

  ngOnInit(): void {
    this.getUserInfo()
  }

  navigateUpdateProfile(): void {
    this.router.navigate(['update']);
  }

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
