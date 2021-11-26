import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ArticleImage } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleImageComponent implements OnInit {
  @Input() images: ArticleImage[] = [];
  @Input() letter: string = '';

  constructor() {}

  ngOnInit(): void {}

  get imageUrl() {
    return `url(${this.images?.[0]?.image})`;
  }
}
