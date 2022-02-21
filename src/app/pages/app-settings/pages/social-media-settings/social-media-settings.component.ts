import { AfterViewInit, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { socialMediaSelectors } from 'src/app/store/selectors/socialmedia.selectors';
import { SocialMediaService } from './services/social-media.service';
import { socialmediaActions } from 'src/app/store/actions/socialmedia.actions';

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

}
