import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Upload } from 'src/app/models/uploads.model';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCardComponent implements OnInit {
  @Input()
  resource!: Upload;

  constructor(private gtag: GoogleAnalyticsService) {}

  ngOnInit() {}

  downloadFile() {
    const file = this.resource?.resource;
    this.gtag.Events.downloadResource(this.resource);
    window.open(file, '_blank');
  }
}
