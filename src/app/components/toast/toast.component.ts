import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input('type') type: 'error' | 'success' | 'warning' = 'success';
  @Input('title') title!: string;
  @Input('message') message!: string;
  @Output('onToastClosed') onToastClosed = new EventEmitter<void>();

  constructor() {
    setTimeout(() => {
      if (this) {
        this.onToastClosed.emit();
      }
    }, 3000);
  }
}
