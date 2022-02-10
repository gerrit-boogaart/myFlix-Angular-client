import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})

export class GenreCardComponent implements OnInit {
  genre: {} = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreCardComponent>,
    // public genre: {name: string, description: string}
  ) { }

  ngOnInit(): void {
  }

  showGenre(): void {
    this.fetchApiData.getGenre().subscribe((resp: any) => {
      this.genre = resp;
      console.log(resp);
      return this.genre;
    })
  }
}
