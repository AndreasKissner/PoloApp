import { Component, signal } from '@angular/core';
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

  setFilter(filter: FilterType) {
    this.activeFilter.set(filter);
  }
}