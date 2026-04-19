import { Component, signal } from '@angular/core';
import { Header } from '../../shared/header/header';
import { SurveyForm} from './survey-form/survey-form';
import { SurveyResults } from './survey-results/survey-results';

@Component({
  selector: 'app-survey-detail',
  imports: [Header, SurveyForm, SurveyResults],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss',
})
export class SurveyDetail {

  resultsOpen = signal(false);

  toggleResults(): void {
    // update() liest den aktuellen Wert und kehrt ihn um
    this.resultsOpen.update(value => !value);
  }
}