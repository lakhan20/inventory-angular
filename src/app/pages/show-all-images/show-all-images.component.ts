import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-all-images',
  standalone: true,
  imports: [MatDialogModule,MatCardModule,CommonModule],
  templateUrl: './show-all-images.component.html',
  styleUrl: './show-all-images.component.css'
})
export class ShowAllImagesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){
  console.log("data from showallimages",this.data );
  
  }
}
