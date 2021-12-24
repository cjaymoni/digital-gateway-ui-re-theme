import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultimediaComponent } from './multimedia.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

@NgModule({
  imports: [CommonModule, NgxYoutubePlayerModule],
  exports: [MultimediaComponent],
  declarations: [MultimediaComponent],
})
export class MultimediaModule {}
