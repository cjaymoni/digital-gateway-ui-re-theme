import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
