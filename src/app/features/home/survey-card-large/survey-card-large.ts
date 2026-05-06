import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Survey } from '../../../models/survey.model';
import { formatDeadline } from '../../../utils/survey-utils';

@Component({
  selector: 'app-survey-card-large',
  imports: [RouterLink],
  templateUrl: './survey-card-large.html',
  styleUrl: './survey-card-large.scss',
})
export class SurveyCardLarge {

  survey = input.required<Survey>();

  /** Returns formatted deadline text. */
  getDeadlineText(): string {
    return formatDeadline(this.survey());
  }
}