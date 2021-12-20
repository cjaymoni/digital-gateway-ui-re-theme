import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { AppUploadedImage } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleImageComponent implements OnInit {
  @Input() images: AppUploadedImage[] = [];
  @Input() letter: string = '';
  @Input() coverBackground = false;
  @Input() preview = true;
  @Input() imageClass = 'h-auto';

  constructor() {}

  ngOnInit(): void {}

  get imageUrl() {
    return `url(${this.images?.[0]?.image})`;
  }
}
