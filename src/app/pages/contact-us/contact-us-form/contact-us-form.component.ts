import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { userAuthSelectors } from 'src/app/store/selectors/user-auth.selectors';
import { ContactUsFormService } from '../contact-us-form.service';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
})
export class ContactUsFormComponent implements OnInit {
  contactUsForm!: FormGroup;
  emailReadonly = false;
  fullnameReadonly = false;
  loading$ = new BehaviorSubject(false);

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
    private readonly fb: FormBuilder,
    private readonly contactUsService: ContactUsFormService,
    private readonly alert: AppAlertService
  ) {}

  ngOnInit() {
    this.contactUsForm = this.fb.group({
      message: ['', [Validators.required]],
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      contact: [
        '',
        [
          Validators.pattern('[- +()0-9]+'),
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      region: ['', [Validators.required]],
    });

    this.store.select(userAuthSelectors.loggedInUser).subscribe(user => {
      if (user) {
        this.contactUsForm?.patchValue({
          email: user?.email,
          full_name: user?.first_name + ' ' + user?.last_name,
        });

        this.emailReadonly = true;
        this.fullnameReadonly = true;
      }
    });
  }

  submit() {
    if (this.contactUsForm.valid) {
      const formValues = this.contactUsForm.value;

      this.contactUsService
        .sendData({ ...formValues, region: formValues.region.value })
        .subscribe(_ => {
          this.loading$.next(false);
          this.alert.showToast(
            'Message sent successfully',
            PrimeNgAlerts.UNOBSTRUSIVE
          );
          this.contactUsForm.reset();
          this.emailReadonly = false;
          this.fullnameReadonly = false;
        });
    }
  }
}

