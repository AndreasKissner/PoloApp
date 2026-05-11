import { Component, input, output, signal, inject, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UiButtonComponent } from '../../../shared/ui-button/ui-button';
import { Survey, Question, Answer } from '../../../models/survey.model';
import { Supabase } from '../../../services/supabase.service';
import { hasVoted, markAsVoted } from '../../../utils/survey-utils';


@Component({
  selector: 'app-survey-form',
  imports: [UiButtonComponent, RouterLink, DatePipe],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {

  private router = inject(Router);
  private readonly LETTER_A_CHAR_CODE = 65;
  private supabase = inject(Supabase);

  survey = input<Survey | null>(null);
  questions = input<Question[]>([]);
  answers = input<Answer[]>([]);
  isPast = input<boolean>(false);

  voted = output<void>();
  selectionChanged = output<Set<string>>();

  selectedAnswers = signal<Map<string, Set<string>>>(new Map());
  showError = signal<boolean>(false);
  alreadyVoted = signal<boolean>(false);

  /** Sets alreadyVoted to true if the user has already voted on this survey. */
  constructor() {
    effect(() => {
      const survey = this.survey();
      if (survey && hasVoted(survey.id)) {
        this.alreadyVoted.set(true);
      }
    });
  }

  /** Returns all answers belonging to a specific question. */
  getAnswersForQuestion(questionId: string): Answer[] {
    return this.answers().filter(answer => answer.question_id === questionId);
  }

  /** Returns the letter (A, B, C...) for an answer based on its index. */
  getAnswerLetter(index: number): string {
    return String.fromCharCode(this.LETTER_A_CHAR_CODE + index);
  }

  /** Checks if an answer is selected for a question. */
  isSelected(questionId: string, answerId: string): boolean {
    return this.selectedAnswers().get(questionId)?.has(answerId) ?? false;
  }

  /** Toggles answer selection. Single-choice replaces, multi-choice adds/removes. */
  toggleAnswer(questionId: string, answerId: string, allowMultiple: boolean): void {
    const current = new Map(this.selectedAnswers());
    const set = allowMultiple ? (current.get(questionId) ?? new Set<string>()) : new Set<string>();
    this.applyToggle(set, answerId, allowMultiple);
    current.set(questionId, set);
    this.selectedAnswers.set(current);
    this.emitAllSelections();
  }

  /** Applies the toggle logic to a Set of selected IDs. */
  private applyToggle(set: Set<string>, answerId: string, allowMultiple: boolean): void {
    if (allowMultiple && set.has(answerId)) {
      set.delete(answerId);
      return;
    }
    set.add(answerId);
  }

  /** Submits all selected answers, increments votes, emits voted event. */
  async onComplete(): Promise<void> {
    if (this.isPast()) return;
    if (!this.allQuestionsAnswered()) {
      this.showError.set(true);
      return;
    }
    this.showError.set(false);
    try {
      await this.submitVotes();
      this.markCurrentAsVoted();
      this.selectedAnswers.set(new Map());
      this.voted.emit();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Failed to submit votes:', error);
    }
  }

  /** Marks the current survey as voted in localStorage. */
  private markCurrentAsVoted(): void {
    const survey = this.survey();
    if (survey) {
      markAsVoted(survey.id);
    }
  }

  /** Iterates through selected answers and increments votes in DB. */
  private async submitVotes(): Promise<void> {
    for (const set of this.selectedAnswers().values()) {
      for (const answerId of set) {
        await this.supabase.incrementVote(answerId);
      }
    }
  }

  /** Emits a flat Set of all currently selected answer IDs. */
  private emitAllSelections(): void {
    const allIds = new Set<string>();
    for (const set of this.selectedAnswers().values()) {
      for (const id of set) {
        allIds.add(id);
      }
    }
    this.selectionChanged.emit(allIds);
  }

  /** Checks if every question has at least one selected answer. */
  private allQuestionsAnswered(): boolean {
    return this.questions().every(question => {
      const set = this.selectedAnswers().get(question.id);
      return set !== undefined && set.size > 0;
    });
  }
}