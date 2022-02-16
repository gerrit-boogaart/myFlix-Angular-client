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
        // successful user registration logic
        console.log(response);
        console.log(this.userDetails);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }
  }

  // submitUpdate(): void {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     this.fetchApiData.updateUser(this.userDetails).subscribe((resp: any) => {
  //       localStorage.setItem('user', JSON.stringify(resp.userDetails));
  //       this.snackBar.open('User Details Updated!', 'OK', {
  //         duration: 2000
  //       })
  //       this.router.navigate([user])
  //       // this.userDetails = resp;
  //       console.log(this.user);
  //     }, (response) => {
  //           this.snackBar.open(response, 'OK', {
  //             duration: 2000
  //           })
  //         });
  //   }
  // }

  // userLogin(): void {
  //   this.fetchApiData.Login(this.userDetails).subscribe((response) => {
  //     this.dialogRef.close();
  //     localStorage.setItem('token', response.token);
  //     localStorage.setItem('user', JSON.stringify(response.user));
  //     this.snackBar.open('Logged In, Welcome!', 'OK', {
  //       duration: 2000
  //     });
  //     this.router.navigate(['movies']);
  //   }, (response) => {
  //     this.snackBar.open(response, 'OK', {
  //       duration: 2000
  //     })
  //   })
  // }

}
