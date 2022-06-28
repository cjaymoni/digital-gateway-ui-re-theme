import { Component, Input, OnInit } from '@angular/core';
import { NavigatorService } from 'src/app/services/navigator.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-opportunitis-card',
  templateUrl: './opportunitis-card.component.html',
  styleUrls: ['./opportunitis-card.component.scss'],
})
export class OpportunitisCardComponent implements OnInit {
  @Input() opportunity: Article | null = null;
  constructor(private navigator: NavigatorService) {}

  ngOnInit() {}

  openOpportunity() {
    this.navigator.article.goToViewDetailsPage(
      this.opportunity?.slug as string
    );
  }
}

