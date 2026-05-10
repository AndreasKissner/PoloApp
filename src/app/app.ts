import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaviconService } from './services/favicon.service'; // Pfad prüfen!

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('poloapp');

  constructor(private faviconService: FaviconService) { }

  /** Starts the favicon cycling on component init. */
  ngOnInit(): void {
    this.faviconService.startCycling(4);
  }
}