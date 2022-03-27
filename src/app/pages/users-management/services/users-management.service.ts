import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersEndPoint } from 'src/app/config/routes';
import { User } from 'src/app/models/user-auth.model';
import { ResourceService } from 'src/app/services/resources.service';
import { map, tap } from 'rxjs';
import { usersListActions } from 'src/app/store/actions/users-list.actions';
import { Store } from '@ngrx/store';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService extends ResourceService {
  constructor(
    http: HttpClient,
    private store: Store,
    transferState: TransferStateService
  ) {
    super(http, UsersEndPoint, transferState);
  }

  editUser(user: any, imageToUpload: any) {}

  editUserRole(formData: any, userId: any) {
    return this.updateResource(formData, userId).pipe(
      map(data => data as User),
      tap(user =>
        this.store.dispatch(
          usersListActions.editUserSuccessful({
            updatedUser: { id: user.id, changes: user },
          })
        )
      )
    );
  }
  editUserPatch(formData: any, userId: any) {
    return this.updateResource(formData, userId).pipe(
      map(data => data as User)
      // tap(user =>
      //   this.store.dispatch(
      //     usersListActions.editUserSuccessful({
      //       updatedUser: { id: user.id, changes: user },
      //     })
      //   )
      // )
    );
  }
  addUser(user: User) {
    return this.storeResource(user).pipe(map(data => data as User));
  }

  searchUser(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as User[])
    );
  }
}
