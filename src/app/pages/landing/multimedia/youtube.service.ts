import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface YoutubeResponse {
  items: [
    {
      id: string;
      snippet: {
        title: string;
        thumbnails: {
          default: {
            url: string;
            width: number;
            height: number;
          };
          medium: {
            url: string;
            width: number;
            height: number;
          };
          high: {
            url: string;
            width: number;
            height: number;
          };
        };
      };
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private readonly httpClient: HttpClient) {}

  getData(videoId: string) {
    const url = this.getYoutubeDataUrl(videoId);
    return this.httpClient.get(url).pipe(
      map(d => d as YoutubeResponse),
      shareReplay(1, 5000)
    );
  }

  getYoutubeDataUrl = (videoId: string) => {
    return `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${environment.GOOGLE_CLIENT}&fields=items(id,snippet(thumbnails,title))&part=snippet`;
  };
}

