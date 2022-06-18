import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
