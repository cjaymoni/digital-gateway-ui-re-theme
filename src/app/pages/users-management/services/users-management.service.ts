import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersEndPoint } from 'src/app/config/routes';
import { User } from 'src/app/models/user-auth.model';
import { ResourceService } from 'src/app/services/resources.service';
import { map, tap } from 'rxjs';
import { usersListActions } from 'src/app/store/actions/users-list.actions';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService extends ResourceService {
  constructor(http: HttpClient, private store: Store) {
    super(http, UsersEndPoint);
  }

  editUser(user: any, imageToUpload: any) {}

  editUserRole(formData: any, userId: any) {
    return this.updateResource(
      formData,
      userId,
      `${environment.API_URL}profile/${userId}`,
      true
    ).pipe(
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
  addUser() {}
  searchUser(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as User[])
    );
  }
}
