import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '../../shared/ui-button/ui-button';
import { SurveyQuestion } from './survey-question/survey-question';
import { SurveySortComponent } from '../home/survey-sort/survey-sort';
import { DeleteBtn } from '../../shared/delete-btn/delete-btn';

@Component({
  selector: 'app-new-survey',
  imports: [Header,RouterLink, UiButtonComponent, SurveyQuestion, SurveySortComponent, DeleteBtn],
  templateUrl: './new-survey.html',
  styleUrl: './new-survey.scss',
})
export class NewSurvey {

  onCategorySelected(category: string) {
  // survey.category = category
}
}
