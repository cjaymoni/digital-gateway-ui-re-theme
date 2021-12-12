import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Upload } from 'src/app/models/uploads.model';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceCardComponent implements OnInit {
  @Input()
  resource!: Upload;

  constructor() { }

  ngOnInit() {
  }

}
