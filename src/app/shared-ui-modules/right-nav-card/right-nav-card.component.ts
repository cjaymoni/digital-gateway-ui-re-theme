import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-right-nav-card',
  templateUrl: './right-nav-card.component.html',
  styleUrls: ['./right-nav-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightNavCard implements OnInit {
  @Input()
  cardHeader: string | undefined;

  @Input()
  cardImage: string | undefined;

  @Input()
  cardLink: string | undefined;

  @Input()
  linkTitle: string | undefined;

  @Input()
  author: string | undefined;

  @Input()
  cardDate: string | undefined;

  @Input()
  cardTag: string | undefined;
  constructor() {}

  ngOnInit() {
    this.cardDate = 'July 20, 2021';
    this.cardHeader = 'Category';
    this.cardImage = 'https://www.moti.gov.gh/erp/web/news_photos/makola.jpg';
    this.cardLink = '/link';
    this.linkTitle = 'Impact of COVID-19 on MSMES';
    this.author = 'Kweku David';
    this.cardTag = 'Finance';
  }
}
