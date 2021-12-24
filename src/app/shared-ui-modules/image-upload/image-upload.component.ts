import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

export enum ImageUploadMode {
  Basic = 'basic',
  Advanced = 'advanced',
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('fu')
  fileUpload!: FileUpload;

  @Input() multiple = true;
  @Input() filesToShow = [];
  @Input() mode = ImageUploadMode.Advanced;
  @Input() label = 'Select an image to upload';

  @Output() addedEvent = new EventEmitter();

  private filesToUpload: File[] | any = [];

  constructor() {}

  ngOnInit(): void {}

  handleSelect({ currentFiles }: { event: any; currentFiles: File[] }) {
    this.filesToUpload = currentFiles;
    this.addedEvent.emit();
  }

  getFilesToUpload() {
    return this.filesToUpload;
  }

  clear() {
    this.filesToUpload = [];
    this.fileUpload?.clear();
  }
}
