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

  @Input() updatedUserData = { Username: '', Email: '', Birthday: '' };

  userDetails: any = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  }

  // @Input() userDetails = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
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
      this.fetchApiData.updateUser(this.updatedUserData).subscribe((response) => {
        console.log(response);
        console.log(this.userDetails);
        // localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('User Info Updated!', 'OK', {
          duration: 2000
        });
        this.router.navigate([user]);
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }
  }

}
