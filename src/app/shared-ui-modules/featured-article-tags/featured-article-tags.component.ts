import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-featured-article-tags',
  templateUrl: './featured-article-tags.component.html',
  styleUrls: ['./featured-article-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedArticleTagsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
