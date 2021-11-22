import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { RouterOutlets } from 'src/app/config/app-config';
import { menuItemActions } from 'src/app/store/actions/menu-items.actions';
import { menuItemSelectors } from 'src/app/store/selectors/menu-items.selectors';
import { userAuthSelectors } from 'src/app/store/selectors/user-auth.selectors';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavComponent implements OnInit {
  loggedInUser$ = this.store
    .select(userAuthSelectors.loggedInUser)
    .pipe(filter(user => !!user));

  items: MenuItem[] = [
    {
      label: 'File',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [{ label: 'Project' }, { label: 'Other' }],
        },
        {
          label: 'Open',
          routerLink: [
            '',
            {
              outlets: {
                [RouterOutlets.Right]: 'comments',
              },
            },
          ],
        },
        { label: 'Quit' },
      ],
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        { label: 'Delete', icon: 'pi pi-fw pi-trash' },
        { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
      ],
    },
  ];

  constructor(private store: Store) {}

  items$ = this.store.select(menuItemSelectors.topMenuItems).pipe(
    distinctUntilChanged(),
    map((menuItem: MenuItem[]) =>
      menuItem.map(item => {
        item.command = event => {
          this.selectMenu(event.item.id);
        };

        return item;
      })
    )
  );

  ngOnInit(): void {}

  selectMenu(id: number) {
    this.store.dispatch(
      menuItemActions.selectMenuItem({
        menuItemId: id,
      })
    );
  }
}
