import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userAuthSelectors } from 'src/app/store/selectors/user-auth.selectors';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
})
export class ContactUsFormComponent implements OnInit {
  contactUsForm!: FormGroup;
  emailReadonly = false;
  fullnameReadonly = false;

  regions = [
    { value: 'AHAFO REGION' },
    { value: 'ASHANTI REGION' },
    { value: 'BONO EAST REGION' },
    { value: 'BRONG AHAFO REGION' },
    { value: 'CENTRAL REGION' },
    { value: 'EASTERN REGION' },
    { value: 'GREATER ACCRA REGION' },
    { value: 'NORTH EAST REGION' },
    { value: 'NORTHERN REGION' },
    { value: 'OTI REGION' },
    { value: 'SAVANNAH REGION' },
    { value: 'UPPER EAST REGION' },
    { value: 'UPPER WEST REGION' },
    { value: 'WESTERN REGION' },
    { value: 'WESTERN NORT REGION' },
    { value: 'VOLTA REGION' },
  ];

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.contactUsForm = this.fb.group({
      message: ['', [Validators.required]],
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      contact: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
      region: ['', [Validators.required]],
    });

    this.store.select(userAuthSelectors.loggedInUser).subscribe(user => {
      if (user) {
        this.contactUsForm?.patchValue({
          email: user?.email,
          fullname: user?.first_name + ' ' + user?.last_name,
        });

        this.emailReadonly = true;
        this.fullnameReadonly = true;
      }
    });
  }
}

