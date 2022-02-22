import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultimediaComponent } from './multimedia.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  imports: [CommonModule, YouTubePlayerModule],
  exports: [MultimediaComponent],
  declarations: [MultimediaComponent],
})
export class MultimediaModule {}
