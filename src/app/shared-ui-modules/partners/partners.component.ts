import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { partnersSelectors } from 'src/app/store/selectors/partners.selectors';

@Component({
  selector: 'app-partners-view',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersViewComponent implements OnInit {
  allPartners$ = this.store.select(partnersSelectors.all);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}

