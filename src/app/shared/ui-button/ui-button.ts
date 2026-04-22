import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'filter' | 'complete' | 'cancel' | 'tertiary' | 'publish' | 'header';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss'
})

export class UiButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() active: boolean = false;
}