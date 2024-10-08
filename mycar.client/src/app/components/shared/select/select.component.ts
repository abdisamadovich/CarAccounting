import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.less'
})
export class SelectComponent {
  @Input() options: any[] = [];
  @Input() selectedValue: any;
  @Output() selectionChange = new EventEmitter<any>();

  onSelectionChange(event: any) {
    this.selectionChange.emit(event.target.value);
  }
}
