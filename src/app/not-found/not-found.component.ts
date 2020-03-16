import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  pixarImageLg: any = '../../assets/images/pixarImage_404_original.jpg';
  pixarImageMd: any = '../../assets/images/pixarImage_404_300x405.jpg';
  pixarImageSm: any = '../../assets/images/pixarImage_404_100x135.jpg';

  constructor() { }

  ngOnInit() {
  }

}
