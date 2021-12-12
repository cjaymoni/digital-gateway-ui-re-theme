import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UploadsService } from '../services/uploads.service';
import { Upload } from 'src/app/models/uploads.model';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceListComponent implements OnInit {

  resourceList$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private uploadsService: UploadsService,
  ) { }

  ngOnInit() {
    this.uploadsService.getUpload().subscribe(upload => {
      const newarray = upload;
      this.resourceList$.next(newarray)
    });
  }

}
