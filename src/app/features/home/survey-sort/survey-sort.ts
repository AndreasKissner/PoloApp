import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-sort.html',
  styleUrl: './survey-sort.scss'
})
export class SurveySortComponent {

  private readonly ALL_CATEGORIES_LABEL = 'All categories';

  label = input<string>('Sort by categories');
  categories = input<string[]>([]);
  showAllOption = input<boolean>(true);

  isOpen = signal(false);
  selected = signal<string | null>(null);

  categorySelected = output<string | null>();

  toggle(): void {
    this.isOpen.update(value => !value);
  }

  select(category: string): void {
    const isAllOption = category === this.ALL_CATEGORIES_LABEL;
    this.selected.set(isAllOption ? null : category);
    this.isOpen.set(false);
    this.categorySelected.emit(isAllOption ? null : category);
  }

  /** Returns the list with "All categories" option prepended. */
  getDisplayCategories(): string[] {
    if (this.showAllOption()) {
      return [this.ALL_CATEGORIES_LABEL, ...this.categories()];
    }
    return this.categories();
  }
}