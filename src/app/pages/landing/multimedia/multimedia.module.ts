import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MultimediaComponent } from './multimedia.component';

@NgModule({
  imports: [CommonModule, YouTubePlayerModule],
  exports: [MultimediaComponent],
  declarations: [MultimediaComponent],
})
export class MultimediaModule {}

