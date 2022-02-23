/**Renders dialog containing data about movie's genre
 * @module GenreCardComponent
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})

export class GenreCardComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    /**
     * Injects data from MovieCardComponent about movie's genre into dialog
     * */
    public data: { name: string; description: string; }
  ) { }

  ngOnInit(): void {
  }
}
