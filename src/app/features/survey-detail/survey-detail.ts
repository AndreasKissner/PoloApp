import { Component, signal, computed } from '@angular/core';
import { Header } from '../../shared/header/header';
import { SurveyForm } from './survey-form/survey-form';
import { SurveyResults } from './survey-results/survey-results';

@Component({
  selector: 'app-survey-detail',
  imports: [Header, SurveyForm, SurveyResults],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss',
})
export class SurveyDetail {
  resultsOpen = signal(false);
  arrowOrange = signal(false);
  isRotating = signal(false);

  isDesktop = signal(window.innerWidth >= 1024);

  resultsVisible = computed(() => this.isDesktop() || this.resultsOpen());

  toggleResults(): void {
    this.isRotating.set(true);
    this.arrowOrange.set(false);

    setTimeout(() => {
      this.isRotating.set(false);
      this.resultsOpen.update(value => !value);
    }, 600);
  }
}