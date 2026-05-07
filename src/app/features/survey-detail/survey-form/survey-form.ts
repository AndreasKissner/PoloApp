import { Component, input, output, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UiButtonComponent } from '../../../shared/ui-button/ui-button';
import { Survey, Question, Answer } from '../../../models/survey.model';
import { Supabase } from '../../../services/supabase.service';

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

  voted = output<void>();
  selectionChanged = output<Set<string>>();

  selectedAnswers = signal<Map<string, Set<string>>>(new Map());

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
    try {
      await this.submitVotes();
      this.selectedAnswers.set(new Map());
      this.voted.emit();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Failed to submit votes:', error);
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
}