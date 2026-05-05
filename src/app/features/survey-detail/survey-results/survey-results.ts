import { Component, input } from '@angular/core';
import { Question, Answer } from '../../../models/survey.model';

@Component({
  selector: 'app-survey-results',
  imports: [],
  templateUrl: './survey-results.html',
  styleUrl: './survey-results.scss',
})
export class SurveyResults {

  isOpen = input<boolean>(false);
  questions = input<Question[]>([]);
  answers = input<Answer[]>([]);

  private readonly LETTER_A_CHAR_CODE = 65;

  /** Returns the letter (A, B, C...) for an answer based on its index. */
  getAnswerLetter(index: number): string {
    return String.fromCharCode(this.LETTER_A_CHAR_CODE + index);
  }

  /** Returns all answers belonging to a specific question. */
  getAnswersForQuestion(questionId: string): Answer[] {
    return this.answers().filter(answer => answer.question_id === questionId);
  }

  /** Calculates percentage of votes for an answer within a question. */
  getPercentage(answer: Answer, questionAnswers: Answer[]): number {
    const total = questionAnswers.reduce((sum, a) => sum + a.vote_count, 0);
    if (total === 0) {
      return 0;
    }
    return Math.round((answer.vote_count / total) * 100);
  }
}