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
  @Output('onToastClosed') closeToast = new EventEmitter<void>();
}
