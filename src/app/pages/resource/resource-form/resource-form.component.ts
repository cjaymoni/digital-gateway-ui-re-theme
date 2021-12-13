import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UploadsService } from '../services/uploads.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { Pages } from 'src/app/config/app-config';

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
    private navigator: NavigatorService,
    private alert: AppAlertService,
    private uploadsService: UploadsService,
  ) { }

  ngOnInit() {
    this.resourceForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
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
        description: uploads.description,
        submitter: 1
      }

      this.uploadsService.addUpload(toSend, resource).subscribe(
        (d: any) => {
          this.alert.showToast(
            'Resource added successfully',
            PrimeNgAlerts.SUCCESS
          );
          this.navigator.resource.go();
        }
      );
    }
  }

}
