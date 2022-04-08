import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UploadsService } from '../services/uploads.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListComponent implements OnInit {
  resourceList$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private uploadsService: UploadsService) {}

  ngOnInit() {
    this.uploadsService.getUpload().subscribe(upload => {
      const newarray = upload;
      this.resourceList$.next(newarray);
    });
  }
}

