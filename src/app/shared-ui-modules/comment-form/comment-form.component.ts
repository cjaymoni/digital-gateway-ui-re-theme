import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';

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
    Validators.maxLength(160),
  ]);

  isHandheld$ = this.device.isHandheld$;

  constructor(private device: DeviceService) {}

  ngOnInit() {}

  addComment() {
    if (this.commentFormControl.valid)
      this.commentAddEvent.emit(this.commentFormControl.value);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  onClickedOutside(e: any) {}
}
