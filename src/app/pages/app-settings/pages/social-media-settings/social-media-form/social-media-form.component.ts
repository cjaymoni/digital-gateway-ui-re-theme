import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialMediaFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
