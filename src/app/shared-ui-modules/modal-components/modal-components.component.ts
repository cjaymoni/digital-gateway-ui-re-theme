import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-modal-components',
  templateUrl: './modal-components.component.html',
  styleUrls: ['./modal-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponentsComponent implements OnInit {
  modalTitle$ = this.navigator.getModalTitle();

  constructor(
    private dialogRef: DynamicDialogRef,
    private navigator: NavigatorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
    this.navigator.closeModal();
  }
}
