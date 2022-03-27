import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Actions, ofType } from '@ngrx/effects';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { NavigatorService } from 'src/app/services/navigator.service';
import { Subscription, filter, take } from 'rxjs';
import { User } from 'src/app/models/user-auth.model';
import { usersListSelectors } from 'src/app/store/selectors/users-list.selectors';
import { tap } from 'rxjs/operators';
import { usersListActions } from '../../store/actions/users-list.actions';
import { SignupService } from '../../pages/signup/services/signup.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { UserManagementService } from 'src/app/pages/users-management/services/users-management.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent implements OnInit, OnDestroy {
  usersForm!: FormGroup;

  subscription!: Subscription;

  createForm = true;

  user!: User;

  oldTitle = '';

  userRoles = [
    { name: 'Admin', value: 'admin' },
    { name: 'Contributor', value: 'contributor' },
    { name: 'Editor', value: 'editor' },
    { name: 'Service', value: 'service' },
    { name: 'Reporter', value: 'reporter' },
  ];

  selectedUser$ = this.store.select(usersListSelectors.selectedUser).pipe(
    filter(d => !!d),
    take(1),
    tap(selected => this.usersForm?.patchValue(selected))
  );
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private title: Title,
    private action$: Actions,
    private navigator: NavigatorService,
    private signupService: SignupService,
    private appAlertService: AppAlertService,
    private userService: UserManagementService
  ) {}

  ngOnDestroy(): void {
    this.title.setTitle(this.oldTitle);
    this.subscription.unsubscribe();
    this.store.dispatch(usersListActions.clearSelected());
  }
  ngOnInit() {
    this.usersForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [''],
      role: ['', Validators.required],
    });

    this.subscription = this.getUserToEditSubscription();
    this.subscription.add(this.addOrEditSubscription());
  }

  onAddOrUpdateUser() {
    if (this.usersForm.valid) {
      const formValues = this.usersForm.getRawValue();

      const newUser = {
        email: formValues.email,
        password: formValues.password,
        role: formValues.role.value,
      };

      const updateUser = {
        email: formValues.email,
        role: formValues.role.value,
      };

      if (this.createForm) {
        this.signupService.signup(newUser).subscribe((data: any) => {
          this.appAlertService.showToast(
            `${data.user.email} account created successfully`,
            PrimeNgAlerts.UNOBSTRUSIVE
          );
          this.navigator.goToRoute(['user-management']);
        });
      } else {
        this.userService
          .editUserPatch(updateUser, this.user.id)
          .subscribe((data: any) => {
            this.appAlertService.showToast(
              `${data.email} status updated successfully`,
              PrimeNgAlerts.UNOBSTRUSIVE
            );
            this.navigator.closeModal();
          });
      }
    }
  }

  private getUserToEditSubscription() {
    return this.store
      .select(usersListSelectors.selectedUser)
      .pipe(
        filter(data => !!data),
        tap((user: User) => {
          this.usersForm.patchValue({
            ...user,
            role: {
              name: this.capitalizeFirstLetter(user.role),
              value: user.role,
            },
          });
          this.user = user;
          this.createForm = false;
          this.navigator.setPanelTitle('Update User');
        })
      )
      .subscribe();
  }

  private capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private addOrEditSubscription() {
    return this.action$
      .pipe(
        ofType(
          usersListActions.editUserSuccessful,
          usersListActions.addUserSuccessful
        ),
        tap(_ => {
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }

  goBack() {
    this.navigator.goBack();
  }
}
