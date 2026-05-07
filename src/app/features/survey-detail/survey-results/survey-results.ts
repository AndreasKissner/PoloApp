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
  pendingSelections = input<Set<string>>(new Set());

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
    const total = this.getTotalVotes(questionAnswers);
    if (total === 0) {
      return 0;
    }
    return Math.round((this.getEffectiveVotes(answer) / total) * 100);
  }

  /** Returns vote_count plus 1 if currently selected. */
  private getEffectiveVotes(answer: Answer): number {
    return answer.vote_count + (this.pendingSelections().has(answer.id) ? 1 : 0);
  }

  /** Returns total votes for a question including pending selections. */
  private getTotalVotes(questionAnswers: Answer[]): number {
    return questionAnswers.reduce((sum, a) => sum + this.getEffectiveVotes(a), 0);
  }
}