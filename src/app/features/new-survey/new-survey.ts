import { Component, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '../../shared/ui-button/ui-button';
import { SurveyQuestion } from './survey-question/survey-question';
import { SurveySortComponent } from '../home/survey-sort/survey-sort';
import { DeleteBtn } from '../../shared/delete-btn/delete-btn';

import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-survey',
  imports: [Header, RouterLink, UiButtonComponent, SurveyQuestion, SurveySortComponent, DeleteBtn, ReactiveFormsModule],
  templateUrl: './new-survey.html',
  styleUrl: './new-survey.scss',
})
export class NewSurvey {

  private formBuilder = inject(FormBuilder);

  surveyForm: FormGroup = this.formBuilder.group({
    title: [''],
    description: [''],
    category: [''],
    deadline: [''],
    questions: this.formBuilder.array([])
  });

  onCategorySelected(category: string) {
    // survey.category = category
  }

  /** Builds a FormGroup for a single answer. */
  private buildAnswer(): FormGroup {
    return this.formBuilder.group({
      text: ['']
    });
  }

  /** Builds a FormGroup for a single question with two empty answers. */
  private buildQuestion(): FormGroup {
    return this.formBuilder.group({
      text: [''],
      allow_multiple: [false],
      answers: this.formBuilder.array([
        this.buildAnswer(),
        this.buildAnswer()
      ])
    });
  }
}
