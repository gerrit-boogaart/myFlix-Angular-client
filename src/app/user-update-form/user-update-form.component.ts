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

  @Input() userDetails = { Username: '', Password: '', Email: '', Birthday: '' };

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
    if (user) {
      this.fetchApiData.updateUser(this.userDetails).subscribe((response) => {
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
