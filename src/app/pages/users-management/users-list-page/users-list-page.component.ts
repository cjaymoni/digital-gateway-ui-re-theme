import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import {
  PrimeNgAlerts,
  UserRoleMapping,
  RouterOutlets,
} from 'src/app/config/app-config';
import { Store } from '@ngrx/store';
import { usersListSelectors } from '../../../store/selectors/users-list.selectors';
import { User } from '../../../models/user-auth.model';
import { usersListActions } from '../../../store/actions/users-list.actions';
import { UserManagementService } from '../services/users-management.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListPageComponent implements OnInit, AfterViewInit {
  @ViewChild('roleTemplate')
  roleTemplate!: TemplateRef<any>;

  @ViewChild('statusTemplate')
  statusTemplate!: TemplateRef<any>;

  usersList$ = this.store.select(usersListSelectors.all);

  columns: any[] = [];

  rolesList!: MenuItem[];

  statusList!: MenuItem[];

  selectedUser: any;

  selectedRole!: string;

  selectedStatus!: string;

  UserRoleMapping = UserRoleMapping;

  constructor(
    private store: Store,
    private userService: UserManagementService,
    private appAlertService: AppAlertService,
    private navigator: NavigatorService,
    private title: Title
  ) {
    this.store.dispatch(usersListActions.fetch());
  }
  ngAfterViewInit(): void {
    this.columns = [
      { header: 'Email', field: 'email' },
      { header: 'ROLE', field: 'role', template: this.roleTemplate },
      { header: 'ACTIVE', field: 'is_active', template: this.statusTemplate },
    ];
  }
  ngOnInit() {
    this.title.setTitle('Users Management');

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

    this.statusList = [
      {
        id: 'true',
        label: 'Active',
        command: e => {
          this.selectedStatus = e.item['id'];
          this.editUserStatus();
        },
      },
      {
        id: 'false',
        label: 'InActive',
        command: e => {
          this.selectedStatus = e.item['id'];
          this.editUserStatus();
        },
      },
    ];
  }

  editUser(user: User) {
    this.navigator.userManagement.goToEditPage(
      user.id,
      'Edit User',
      RouterOutlets.Modal
    );
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

  editUserStatus() {
    const formData = {
      is_active: this.selectedStatus,
    };
    const userId = this.selectedUser.id;
    this.userService.editUserPatch(formData, userId).subscribe((data: any) => {
      this.appAlertService.showToast(
        `${data.email} status updated successfully`,
        PrimeNgAlerts.UNOBSTRUSIVE
      );
    });
  }
  viewUser(user: User) {
    this.navigator.userManagement.goToViewPage(
      user.id,
      'Preview User',
      RouterOutlets.Modal
    );
  }

  goToAddUserPage() {
    this.navigator.userManagement.goToAddPage();
  }
}
