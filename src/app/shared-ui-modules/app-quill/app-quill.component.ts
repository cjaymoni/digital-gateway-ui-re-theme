import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-content-box',
  templateUrl: './app-quill.component.html',
  styleUrls: ['./app-quill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppQuillComponent implements OnInit {
  @Input() contentFormControl = new FormControl('');
  @Input() placeholder = 'Enter content body';
  @Input() classNames = '';
  @Input() required = true;

  constructor() {}

  ngOnInit() {}

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'], // remove formatting button
        ['link', 'image'],
      ],
    },
  };

  onSelectionChanged = (event: any) => {};

  onContentChanged = (event: any) => {
    //console.log(event.html);
  };
}
