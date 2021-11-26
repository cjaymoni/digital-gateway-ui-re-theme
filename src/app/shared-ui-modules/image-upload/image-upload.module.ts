import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [ImageUploadComponent],
  imports: [CommonModule, FileUploadModule],
  exports: [ImageUploadComponent],
})
export class ImageUploadModule {}
