import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '../../shared/ui-button/ui-button';
import { SurveyQuestion } from './survey-question/survey-question';

@Component({
  selector: 'app-new-survey',
  imports: [Header,RouterLink, UiButtonComponent, SurveyQuestion],
  templateUrl: './new-survey.html',
  styleUrl: './new-survey.scss',
})
export class NewSurvey {}
