import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Forum } from 'src/app/models/forum.model';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumCardComponent implements OnInit {
  @Input() forum: Forum | null = null;
  @Input() count: any = 0;

  constructor(private navigator: NavigatorService) {}

  ngOnInit() {}

  openForum() {
    this.navigator.forum.goToViewDetailsPage(this.forum?.slug as string);
  }

  dislikeForum() {}
  likeForum() {}
}
