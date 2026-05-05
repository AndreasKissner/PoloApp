import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UiButtonComponent } from '../../../shared/ui-button/ui-button';
import { Survey, Question, Answer } from '../../../models/survey.model';

@Component({
  selector: 'app-survey-form',
  imports: [UiButtonComponent, RouterLink, DatePipe],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {

  private readonly LETTER_A_CHAR_CODE = 65;

  survey = input<Survey | null>(null);
  questions = input<Question[]>([]);
  answers = input<Answer[]>([]);

  /** Returns all answers belonging to a specific question. */
  getAnswersForQuestion(questionId: string): Answer[] {
    return this.answers().filter(answer => answer.question_id === questionId);
  }

  /** Returns the letter (A, B, C...) for an answer based on its index. */
  getAnswerLetter(index: number): string {
    return String.fromCharCode(this.LETTER_A_CHAR_CODE + index);
  }
}