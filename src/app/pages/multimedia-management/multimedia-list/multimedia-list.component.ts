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
import { multiMediaSelectors } from 'src/app/store/selectors/multimedia.selectors';
import { MultiMedia } from 'src/app/models/multimedia.model';

@Component({
  selector: 'app-multimedia-list',
  templateUrl: './multimedia-list.component.html',
  styleUrls: ['./multimedia-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultimediaListComponent implements OnInit, AfterViewInit {
  @ViewChild('mediaTypeTemplate')
  mediaTypeTemplate!: TemplateRef<any>;

  @ViewChild('featuredTemplate')
  featuredTemplate!: TemplateRef<any>;

  multiMedia$ = this.store.select(multiMediaSelectors.all);

  columns: any[] = [];

  constructor(
    private store: Store,
    private title: Title,
    private navigator: NavigatorService
  ) {}

  ngAfterViewInit(): void {
    this.columns = [
      { header: 'URL', field: 'url' },
      {
        header: 'MEDIA TYPE',
        field: 'media_type',
        template: this.mediaTypeTemplate,
      },
      {
        header: 'FEATURED',
        field: 'featured',
        template: this.featuredTemplate,
      },
    ];
  }
  ngOnInit() {
    this.title.setTitle('Multimedia Management');
  }

  goToAddNewMedia() {
    this.navigator.multiMedia.goToAddPage(RouterOutlets.Modal);
  }

  editMedia(multimedia: MultiMedia) {
    this.navigator.multiMedia.goToEditPage(
      multimedia.id,
      'Edit MultiMedia',
      RouterOutlets.Modal
    );
  }

  viewMedia(multimedia: MultiMedia) {
    this.navigator.multiMedia.goToViewPage(
      multimedia.id,
      'View MultiMedia',
      RouterOutlets.Modal
    );
  }
}
