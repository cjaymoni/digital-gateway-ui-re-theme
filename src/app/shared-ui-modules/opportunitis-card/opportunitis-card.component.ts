import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-opportunitis-card',
  templateUrl: './opportunitis-card.component.html',
  styleUrls: ['./opportunitis-card.component.scss'],
})
export class OpportunitisCardComponent implements OnInit {
  @Input() opportunity: Category | null = null;
  imageSrc =
    'https://www.cater4you.co.uk/acatalog/large-brown-carry-pack-food-packaging-1000.jpg';
  constructor() {}

  ngOnInit() {}
}
