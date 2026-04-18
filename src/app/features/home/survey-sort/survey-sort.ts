import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-sort.html',
  styleUrl: './survey-sort.scss'
})
export class SurveySortComponent {
  isOpen = signal(false);
  selected = signal<string | null>(null);

  categories = [
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation'
  ];

  toggle() {
    this.isOpen.update(v => !v);
  }

  select(category: string) {
    this.selected.set(category);
    this.isOpen.set(false);
  }
}