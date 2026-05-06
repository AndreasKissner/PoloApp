import { Component, signal, output } from '@angular/core';
import { UiButtonComponent } from '../../../shared/ui-button/ui-button';

type FilterType = 'active' | 'past';

@Component({
  selector: 'app-survey-filter',
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: './survey-filter.html',
  styleUrl: './survey-filter.scss'
})
export class SurveyFilterComponent {

  activeFilter = signal<FilterType>('active');
  filterChanged = output<FilterType>();

  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
    this.filterChanged.emit(filter);
  }
}