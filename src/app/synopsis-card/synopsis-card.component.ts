/**Renders dialog containing data about movie's synopsis
 * @module SynopsisCardComponent
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    /**
     * Injects data from MovieCardComponent about movie's synopsis into dialog
     * */
    public data: { title: string; director: string, description: string; }
  ) { }

  ngOnInit(): void {
  }

}
