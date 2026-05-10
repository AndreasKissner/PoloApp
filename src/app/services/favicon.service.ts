import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser'; // Wichtig für den Tab-Text
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaviconService {
  private intervalSub?: Subscription;

  // Icons aus deinem public-Ordner
  private readonly ICON_1 = 'favicon.ico';
  private readonly ICON_2 = 'favicon2.ico';
  private isAltIcon = false;

  // Titel-Liste
  private titles = ['PollApp', 'Surveys', 'System'];
  private titleIndex = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title // Angular Service für den Browsertitel
  ) { }

  /**
   * Startet den Wechsel von Icon und Titel alle X Sekunden
   */
  startCycling(seconds: number = 2) {
    if (this.intervalSub) return;
    this.intervalSub = interval(seconds * 1000).subscribe(() => {
      // 1. Icon wechseln
      this.isAltIcon = !this.isAltIcon;
      this.updateFavicon(this.isAltIcon ? this.ICON_2 : this.ICON_1);

      // 2. Titel wechseln
      this.titleIndex = (this.titleIndex + 1) % this.titles.length;
      this.titleService.setTitle(this.titles[this.titleIndex]);
    });
  }

  /** Updates the favicon link in the document head to the given filename. */
  private updateFavicon(fileName: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel*='icon']");

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'icon';
      this.document.head.appendChild(link);
    }

    link.href = fileName;
  }

  /** Stops the favicon cycling interval if active. */
  stopCycling(): void {
    this.intervalSub?.unsubscribe();
    this.intervalSub = undefined;
  }
}