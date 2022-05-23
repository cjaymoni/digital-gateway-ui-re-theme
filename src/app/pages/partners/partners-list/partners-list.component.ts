import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { partnersSelectors } from 'src/app/store/selectors/partners.selectors';
import { IPartners } from 'src/app/models/partners.model';
import { partnersActions } from 'src/app/store/actions/partners.actions';

@Component({
  selector: 'app-partners-list',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersListComponent implements OnInit, AfterViewInit {

  partners$ = this.store.select(partnersSelectors.all);

  columns: any[] = [];

  constructor(
    private store: Store,
    private title: Title,
    private navigator: NavigatorService
  ) {}

  ngAfterViewInit(): void {
    this.fetchData();
    this.columns = [
      {
        header: 'Name',
        field: 'name',
      },
      {
        header: 'DESCRIPTION',
        field: 'desription',
      },
      { header: 'URL', field: 'url' },
    ];
  }

  ngOnInit() {
    this.title.setTitle('Partners');
  }

  goToAddNewPartner() {
    this.navigator.partners.goToAddPage(RouterOutlets.Modal);
  }

  editPartner(partner: IPartners) {
    this.navigator.partners.goToEditPage(
      partner.id,
      'Edit Partner',
      RouterOutlets.Modal
    );
  }

  viewPartner(partner: IPartners) {
    this.navigator.partners.goToViewPage(
      partner.id,
      'View Partner',
      RouterOutlets.Modal
    );
  }

  fetchData = () => {
    this.store.dispatch(partnersActions.fetch());
  };

}
