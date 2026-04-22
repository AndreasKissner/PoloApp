import { Component, Input } from '@angular/core';
import { UiButtonComponent } from '../ui-button/ui-button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.header--dark]': 'theme === "dark"',
    '[class.header--light]': 'theme === "light"'
  }
})
export class Header {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() showCreateBtn: boolean = false;

  get logoSrc(): string {
    return this.theme === 'dark'
      ? 'assets/images/logo-orange.svg'
      : 'assets/images/logo-purple.svg';
  }
}