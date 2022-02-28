import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about-us-view',
  templateUrl: './about-us-view.component.html',
  styleUrls: ['./about-us-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsViewComponent implements OnInit {
  sideImage =
    'https://www.westend61.de/images/0000706025pw/close-up-of-man-using-laptop-next-to-construction-plan-at-desk-UUF006373.jpg';

  partImage = 'https://www.gsa.gov.gh/wp-content/uploads/2021/06/UNDP.png';
  constructor() {}

  ngOnInit() {}
}
