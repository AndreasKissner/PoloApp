import { Component, input, output } from '@angular/core';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { DeleteBtn } from '../../../shared/delete-btn/delete-btn';
import { UiButtonComponent } from '../../../shared/ui-button/ui-button';
import { QUESTION_MAX_LENGTH, ANSWER_MAX_LENGTH } from '../../../utils/survey-utils';

@Component({
  selector: 'app-survey-question',
  imports: [DeleteBtn, UiButtonComponent, ReactiveFormsModule],
  templateUrl: './survey-question.html',
  styleUrl: './survey-question.scss',
})
export class SurveyQuestion {

  private readonly LETTER_A_CHAR_CODE = 65;
  private readonly MAX_ANSWERS = 4;

  questionForm = input.required<FormGroup>();
  questionIndex = input<number>(0);

  delete = output<void>();
  addAnswer = output<void>();
  removeAnswer = output<number>();
  readonly questionMaxLength = QUESTION_MAX_LENGTH;
  readonly answerMaxLength = ANSWER_MAX_LENGTH;

  /** Returns the length of question max length */
  get questionTextControl() {
    return this.questionForm().get('text');
  }

  /** Returns the answers FormArray of the current question. */
  get answers(): FormArray {
    return this.questionForm().get('answers') as FormArray;
  }

  /** Returns true if more answers can be added (limit not yet reached). */
  get canAddAnswer(): boolean {
    return this.answers.length < this.MAX_ANSWERS;
  }

  /** Returns the letter (A, B, C...) for an answer based on its index. */
  getAnswerLetter(index: number): string {
    return String.fromCharCode(this.LETTER_A_CHAR_CODE + index);
  }/** Emits the delete event to the parent. */
  onDelete(): void {
    this.delete.emit();
  }

  /** Emits the add answer event to the parent. */
  onAddAnswer(): void {
    this.addAnswer.emit();
  }

  /** Emits the remove answer event with the answer index to the parent. */
  onRemoveAnswer(answerIndex: number): void {
    this.removeAnswer.emit(answerIndex);
  }
  /** Checks if "allow multiple" is enabled in the form. */
  isMultipleChecked(): boolean {
    return this.questionForm().get('allow_multiple')?.value === true;
  }
}