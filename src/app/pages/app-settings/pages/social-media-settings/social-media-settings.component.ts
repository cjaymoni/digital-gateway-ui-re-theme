import { AfterViewInit, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { socialMediaSelectors } from 'src/app/store/selectors/socialmedia.selectors';
import { SocialMediaService } from './services/social-media.service';
import { socialmediaActions } from 'src/app/store/actions/socialmedia.actions';
import { SocialMedia } from 'src/app/models/social-media.model';

@Component({
  selector: 'app-social-media-settings',
  templateUrl: './social-media-settings.component.html',
  styleUrls: ['./social-media-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialMediaSettingsComponent implements OnInit {

  socialMedia$ = this.store.select(socialMediaSelectors.all);
  // socialMedia: any = [];

  columns: any[] = [];

  constructor(
    private store: Store,
    private socialMediaService: SocialMediaService,
    private navigator: NavigatorService
    ) {
    this.store.dispatch(socialmediaActions.fetch());
  }

  ngOnInit() {
    this.columns = [
      {
        header: 'SOCIAL MEDIA',
        field: 'twitter'
      },
      {
        header: 'URL',
        field: 'twitter'
      },
      {
        header: 'DEFAULT',
        field: 'is_default'
      }
    ];

    // this.socialMediaService.getSocialMedia().subscribe(data => {
    //   this.socialMedia = data;
    //   console.log(this.socialMedia);
    // });
  }

  goToAddNewMedia() {
    this.navigator.siteSettings.goToAddPage(RouterOutlets.Modal);
  }

  editMedia(socialmedia: SocialMedia) {
    this.navigator.siteSettings.goToEditPage(
      socialmedia.id,
      'Edit Social Media',
      RouterOutlets.Modal
    );
  }

  viewMedia(socialmedia: SocialMedia) {
    this.navigator.siteSettings.goToViewPage(
      socialmedia.id,
      'View Social Media',
      RouterOutlets.Modal
    );
  }


}
