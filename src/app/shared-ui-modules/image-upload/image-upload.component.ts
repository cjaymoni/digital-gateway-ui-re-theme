import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent implements OnInit {
  @Input() multiple = true;
  @Input() filesToShow = [];

  private filesToUpload: File[] | any = [];

  constructor() {}

  ngOnInit(): void {}

  handleSelect({ currentFiles }: { event: any; currentFiles: File[] }) {
    this.filesToUpload = currentFiles;
  }

  getFilesToUpload() {
    return this.filesToUpload;
  }
}
