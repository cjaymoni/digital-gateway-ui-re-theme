import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer-socials',
  templateUrl: './footer-socials.component.html',
  styleUrls: ['./footer-socials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSocialsComponent implements OnInit {
  facebookLink = 'https://www.facebook.com/';
  twitterLink = 'https://twitter.com/';
  instaLink = 'https://instagram.com/msme_digital_gateway?igshid=YmMyMTA2M2Y=';
  constructor() {}

  ngOnInit() {}
}

