import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() theme: 'dark' | 'light' = 'dark';

  get logoSrc(): string {
    return this.theme === 'dark'
      ? 'assets/images/logo-orange.svg'
      : 'assets/images/logo-purple.svg';
  }
}