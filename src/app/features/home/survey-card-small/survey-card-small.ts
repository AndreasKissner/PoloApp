import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Survey } from '../../../models/survey.model';
import { formatDeadline } from '../../../utils/survey-utils';

@Component({
  selector: 'app-survey-card-small',
  imports: [RouterLink],
  templateUrl: './survey-card-small.html',
  styleUrl: './survey-card-small.scss',
})
export class SurveyCardSmall {

  survey = input.required<Survey>();

  /** Returns formatted deadline text. */
  getDeadlineText(): string {
    return formatDeadline(this.survey());
  }
}