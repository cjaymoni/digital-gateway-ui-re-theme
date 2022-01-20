import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { Store } from '@ngrx/store';
import { usersListSelectors } from '../../../store/selectors/users-list.selectors';
import { User } from '../../../models/user-auth.model';
import { usersListActions } from '../../../store/actions/users-list.actions';
import { UserManagementService } from '../services/users-management.service';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListPageComponent implements OnInit {
  usersList$ = this.store.select(usersListSelectors.all);

  columns: any[] = [];

  rolesList!: MenuItem[];

  selectedUser: any;

  selectedRole!: string;

  constructor(
    private store: Store,
    private userService: UserManagementService,
    private appAlertService: AppAlertService
  ) {
    this.store.dispatch(usersListActions.fetch());
  }

  ngOnInit() {
    this.columns = [
      { header: 'Email', field: 'email' },
      { header: 'Role', field: 'role' },
    ];

    this.rolesList = [
      {
        id: 'editor',
        label: 'Editor',
        command: e => {
          this.selectedRole = e.item['id'];
          this.editUserRole();
        },
      },
      {
        id: 'contributor',
        label: 'Contributor',
        command: e => {
          this.selectedRole = e.item['id'];
          this.editUserRole();
        },
      },
      {
        id: 'service',
        label: 'Service',
        command: e => {
          this.selectedRole = e.item['id'];
          this.editUserRole();
        },
      },
      {
        id: 'reporter',
        label: 'Reporter',
        command: e => {
          this.selectedRole = e.item['id'];
          this.editUserRole();
        },
      },
      {
        id: 'admin',
        label: 'Admin',
        command: e => {
          this.selectedRole = e.item['id'];
          this.editUserRole();
        },
      },
    ];
  }

  editUserRole() {
    const formData = {
      role: this.selectedRole,
    };
    const userId = this.selectedUser.id;
    this.userService.editUserRole(formData, userId).subscribe((data: any) => {
      this.appAlertService.showToast(
        `${data.email} role updated successfully`,
        PrimeNgAlerts.UNOBSTRUSIVE
      );
    });
  }

  viewUser(user: User) {
    alert('development in progress');
  }

  goToAddUserPage() {}
}
