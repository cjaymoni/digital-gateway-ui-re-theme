import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { User } from '../../models/user-auth.model';
import { UserManagementService } from 'src/app/pages/users-management/services/users-management.service';
import { usersListActions } from '../actions/users-list.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class UsersListEffects {
  loadUsersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersListActions.fetch),
      switchMap(() =>
        this.userService.getResources().pipe(
          map((usersLists: User[]) =>
            usersListActions.fetchSuccessful({
              usersLists,
            })
          ),
          catchError(error => of(usersListActions.fetchError({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersListActions.addUser),
      switchMap(({ user }) =>
        this.userService.storeResource(user).pipe(
          map((user: any) =>
            usersListActions.addUserSuccessful({
              user,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'User  added successfully',
              PrimeNgAlerts.SUCCESS
            )
          ),
          catchError(error => of(usersListActions.fetchError({ error })))
        )
      )
    )
  );
  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersListActions.findAndSelectUser),
      switchMap(({ searchParams }) =>
        this.userService.searchUser(searchParams).pipe(
          map((usersList: User[]) =>
            usersListActions.selectUser({
              user: usersList?.[0],
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(usersListActions.fetchError);
          })
        )
      )
    )
  );

  searchUsereById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersListActions.findAndSelectUserById),
      switchMap(({ id }) =>
        this.userService.getOneResource(id).pipe(
          tap(user => {
            this.store.dispatch(usersListActions.selectUserToEdit({ user }));
          }),
          map((user: User) =>
            usersListActions.selectUser({
              user,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(usersListActions.fetchError);
          })
        )
      )
    )
  );

  searchAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersListActions.searchUser),
      switchMap(({ searchParams }) =>
        this.userService.searchUser(searchParams).pipe(
          map((usersList: User[]) =>
            usersListActions.fetchSearchSuccessful({
              usersList,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(usersListActions.fetchError);
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersListActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteResource(id).pipe(
          map((user: any) =>
            usersListActions.deleteUserSuccessful({
              id,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'User deleted successfully',
              PrimeNgAlerts.UNOBSTRUSIVE
            )
          ),
          catchError(error => of(usersListActions.fetchError(error)))
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
    private userService: UserManagementService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
