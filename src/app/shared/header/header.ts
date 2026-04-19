import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.header--dark]': 'theme === "dark"',
    '[class.header--light]': 'theme === "light"'
  }
})
export class Header {
  @Input() theme: 'dark' | 'light' = 'dark';

  get logoSrc(): string {
    return this.theme === 'dark'
      ? 'assets/images/logo-orange.svg'
      : 'assets/images/logo-purple.svg';
  }
}