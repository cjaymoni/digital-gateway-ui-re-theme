import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { UserProfileService } from 'src/app/pages/user-profile/services/user-profile.service';
import { UserManagementService } from 'src/app/pages/users-management/services/users-management.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { User, UserProfile } from '../../models/user-auth.model';
import { userAuthActions } from '../actions/user-auth.actions';
import { userProfileActions } from '../actions/user-profile.actions';

@Injectable()
export class UserProfileEffects {
  searchUserProfileById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.findAndSelectUserProfileById),
      switchMap(({ id }) =>
        this.authService.getOneResource(id).pipe(
          tap(userProfile => {
            this.store.dispatch(
              userProfileActions.selectUserProfileToEdit({ userProfile })
            );
          }),
          map((userProfile: UserProfile) =>
            userProfileActions.selectUserProfile({
              userProfile,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(userProfileActions.fetchError);
          })
        )
      )
    )
  );
  editUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.editUserProfile),
      switchMap(({ userProfile, imageToUpload }) =>
        this.authService.editProfile(userProfile, imageToUpload).pipe(
          map((updatedUserProfile: any) =>
            userProfileActions.editUserProfileSuccessful({
              updatedUserProfile: {
                changes: updatedUserProfile,
                id: updatedUserProfile.id,
              },
            })
          ),
          tap(saved => this.showToast('User Profile Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(userProfileActions.fetchError);
          })
        )
      )
    )
  );

  userUpdated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAuthActions.updateUser),
      switchMap(() =>
        this.loginService.fetchUserDetails().pipe(
          map((updatedUser: User) =>
            userAuthActions.userUpdated({
              user: updatedUser,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(userProfileActions.fetchError);
          })
        )
      )
    )
  );

  passwordResetRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAuthActions.requestPasswordReset),
      switchMap(({ email }) =>
        this.loginService.requestPasswordReset(email).pipe(
          tap(() => {
            this.showToast(
              'Password reset request sent successfully. Check your email'
            );
          })
        )
      )
    )
  );

  private showToast(message: string) {
    this.alert.showToast(message, PrimeNgAlerts.UNOBSTRUSIVE);
  }

  private showError(error: any) {
    this.alert.showToast(
      'An error occurred. Rest assured we will fix it',
      PrimeNgAlerts.ERROR
    );
  }

  constructor(
    private actions$: Actions,
    private authService: UserProfileService,
    private alert: AppAlertService,
    private store: Store,
    private loginService: LoginService
  ) {}
}

