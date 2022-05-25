import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { digitalLinkSelectors } from 'src/app/store/selectors/digital-link.selectors';
import { DigitalLink } from 'src/app/models/digital-link.model';
import { digitalLinkActions } from 'src/app/store/actions/digital-link.actions';

@Component({
  selector: 'app-digital-link-list',
  templateUrl: './digital-link-list.component.html',
  styleUrls: ['./digital-link-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalLinkListComponent implements OnInit, AfterViewInit {
  @ViewChild('featuredTemplate')
  featuredTemplate!: TemplateRef<any>;

  digitalLink$ = this.store.select(digitalLinkSelectors.all);

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
        header: 'TITLE',
        field: 'title',
      },
      {
        header: 'DESCRIPTION',
        field: 'description',
      },
      {
        header: 'FEATURED',
        field: 'featured',
        template: this.featuredTemplate,
      },
      { header: 'URL', field: 'url' },
    ];
  }
  ngOnInit() {
    this.title.setTitle('Direct Links');
  }

  goToAddNewLink() {
    this.navigator.digitalLink.goToAddPage(RouterOutlets.Modal);
  }

  editLink(digitallink: DigitalLink) {
    this.navigator.digitalLink.goToEditPage(
      digitallink.id,
      'Edit Direct Link',
      RouterOutlets.Modal
    );
  }

  viewLink(digitallink: DigitalLink) {
    this.navigator.digitalLink.goToViewPage(
      digitallink.id,
      'View Direct Link',
      RouterOutlets.Modal
    );
  }

  fetchData = () => {
    this.store.dispatch(digitalLinkActions.fetch());
  };
}
