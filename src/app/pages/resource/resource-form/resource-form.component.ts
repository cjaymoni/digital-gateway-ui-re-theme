import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UploadsService } from '../services/uploads.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceFormComponent implements OnInit {

  private filesToUpload!: File[];

  resourceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private uploadsService: UploadsService,
  ) { }

  ngOnInit() {
    this.resourceForm = this.fb.group({
      title: ['', [Validators.required]],
      upload: [''],
    });
  }

  handleSelect({ currentFiles }: { event: any; currentFiles: File[] }) {
    this.filesToUpload = currentFiles;
  }

  UploadResource(){
    if (this.resourceForm.valid){
      const uploads = this.resourceForm.value;
      const resource = this.filesToUpload[0];
      const toSend = {
        name: uploads.title,
        submitter: 1
      }

      console.log(toSend);
      this.uploadsService.addUpload(toSend, resource).subscribe();
    }
  }

}
