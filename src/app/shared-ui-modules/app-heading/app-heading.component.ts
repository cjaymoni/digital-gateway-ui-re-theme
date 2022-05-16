import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './app-heading.component.html',
  styleUrls: ['./app-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeadingComponent implements OnInit {
  @Input() title = 'Listing';
  @Input() description: string | undefined;
  @Input() sideTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;

  constructor() {}

  ngOnInit(): void {}
}

