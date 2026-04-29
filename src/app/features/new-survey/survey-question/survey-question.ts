import { Component, input, output } from '@angular/core';
import { DeleteBtn } from "../../../shared/delete-btn/delete-btn";
import { UiButtonComponent } from '../../../shared/ui-button/ui-button';

@Component({
  selector: 'app-survey-question',
  imports: [DeleteBtn, UiButtonComponent],
  templateUrl: './survey-question.html',
  styleUrl: './survey-question.scss',
})
export class SurveyQuestion {
  questionIndex = input<number>(0);
  delete = output<void>();

  onDelete(): void {
    this.delete.emit();
  }
}