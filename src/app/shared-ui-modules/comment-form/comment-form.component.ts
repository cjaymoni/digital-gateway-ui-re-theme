import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnInit {
  @Output() commentAddEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();

  commentFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor() {}

  ngOnInit() {}

  addComment() {
    if (this.commentFormControl.valid)
      this.commentAddEvent.emit(this.commentFormControl.value);
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
