import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-opportunitis-card',
  templateUrl: './opportunitis-card.component.html',
  styleUrls: ['./opportunitis-card.component.scss'],
})
export class OpportunitisCardComponent implements OnInit {
  @Input() opportunity: Article | null = null;
  constructor() {}

  ngOnInit() {}
}
