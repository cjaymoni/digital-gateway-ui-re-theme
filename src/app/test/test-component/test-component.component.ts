import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponentComponent implements OnInit {
  constructor(private store: Store) {}

  article$ = this.store.select(articleSelectors.selectedArticle);

  ngOnInit(): void {}
}
