import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-management-list.component.html',
  styleUrls: ['./content-management-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentManagementListComponent implements OnInit {
  @Input() title: string = '';
  @Input() placeholder = 'Type name here';
  @Input() availableList: any[] = [];

  @Output() addItemEvent = new EventEmitter();
  @Output() removeItemEvent = new EventEmitter();

  showCreate = false;
  inputFormControl = new FormControl('', [Validators.required]);
  selectedItems = [];

  constructor(private cdref: ChangeDetectorRef) {}

  ngOnInit() {}

  addNewItem() {
    this.showCreate = true;
  }

  cancelAdd() {
    this.showCreate = false;
  }

  addItem() {
    this.addItemEvent.emit(this.inputFormControl.value);
    this.inputFormControl.setValue(null);
  }

  removeItem(item: any) {
    this.removeItemEvent.emit(item);
    this.inputFormControl.setValue(null);
  }

  removeSelected() {
    this.removeItemEvent.emit(this.selectedItems);
    this.selectedItems = [];
  }
}
