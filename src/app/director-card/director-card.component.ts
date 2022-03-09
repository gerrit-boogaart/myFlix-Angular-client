/**Renders dialog containing data about movie's director
 * @module DirectorCardComponent
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})

export class DirectorCardComponent implements OnInit {
  constructor(
    /**Injects data from MovieCardComponent about movie's director into dialog*/
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string; bio: string; birth: string; }
  ) { }

  ngOnInit(): void {
  }

}