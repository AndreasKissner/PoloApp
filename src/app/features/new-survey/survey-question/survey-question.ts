import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-survey-question',
  imports: [],
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