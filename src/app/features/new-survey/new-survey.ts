import { Component, inject, OnInit } from '@angular/core';
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
export class NewSurvey implements OnInit {

  private readonly TITLE_MAX_LENGTH = 100;
  private readonly DESCRIPTION_MAX_LENGTH = 500;
  private readonly QUESTION_MAX_LENGTH = 200;
  private readonly ANSWER_MAX_LENGTH = 100;

  private formBuilder = inject(FormBuilder);

  surveyForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)]],
    description: ['', [Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)]],
    category: [''],
    deadline: [''],
    questions: this.formBuilder.array([])
  });

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }


  ngOnInit(): void {
    this.questions.push(this.buildQuestion());
  }

  onCategorySelected(category: string) {
    // survey.category = category
  }

  /** Returns the answers FormArray of a specific question. */
  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  /** Adds a new empty question to the survey. */
  addQuestion(): void {
    this.questions.push(this.buildQuestion());
  }

  /** Removes a question. Question at index 0 is only cleared, not removed. */
  removeQuestion(questionIndex: number): void {
    if (questionIndex === 0) {
      this.clearFirstQuestion();
      return;
    }
    this.questions.removeAt(questionIndex);
  }

  /** Adds a new empty answer to a specific question. */
  addAnswer(questionIndex: number): void {
    this.getAnswers(questionIndex).push(this.buildAnswer());
  }

  /** Removes an answer from a specific question. */
  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.getAnswers(questionIndex).removeAt(answerIndex);
  }

  /** Builds a FormGroup for a single answer. */
  private buildAnswer(): FormGroup {
    return this.formBuilder.group({
      text: ['', [Validators.required, Validators.maxLength(this.ANSWER_MAX_LENGTH)]]
    });
  }

  /** Builds a FormGroup for a single question with two empty answers. */
  private buildQuestion(): FormGroup {
    return this.formBuilder.group({
      text: ['', [Validators.required, Validators.maxLength(this.QUESTION_MAX_LENGTH)]],
      allow_multiple: [false],
      answers: this.formBuilder.array([
        this.buildAnswer(),
        this.buildAnswer()
      ])
    });
  }

   /** Resets all values of the first question without removing it. */
  private clearFirstQuestion(): void {
    this.questions.at(0).reset({
      text: '',
      allow_multiple: false
    });
  }
  
}
