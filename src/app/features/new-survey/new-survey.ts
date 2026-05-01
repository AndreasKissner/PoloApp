import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase.service';
import { Header } from '../../shared/header/header';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '../../shared/ui-button/ui-button';
import { SurveyQuestion } from './survey-question/survey-question';
import { SurveySortComponent } from '../home/survey-sort/survey-sort';
import { DeleteBtn } from '../../shared/delete-btn/delete-btn';

import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnswerInput, QuestionInput, SurveyInput } from '../../models/survey.model';

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
  private supaBase = inject(Supabase);
  private router = inject(Router);

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

  /** Submits the survey: validates, saves to DB, navigates to detail view. */
  async onSubmit(): Promise<void> {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    try {
      const surveyId = await this.saveSurvey();
      const questionIds = await this.saveQuestions(surveyId);
      await this.saveAnswers(questionIds);
      this.router.navigate(['/survey', surveyId]);
    } catch (error) {
      console.error('Failed to save survey:', error);
    }
  }

  /** Saves the survey to the DB and returns the generated ID. */
  private async saveSurvey(): Promise<string> {
    const surveyInput = this.buildSurveyInput();
    return await this.supaBase.createSurvey(surveyInput);
  }

  /** Saves all questions linked to the survey and returns their IDs. */
  private async saveQuestions(surveyId: string): Promise<string[]> {
    const questionsInput = this.buildQuestionsInput(surveyId);
    return await this.supaBase.createQuestions(questionsInput);
  }

  /** Saves all answers linked to their questions. */
  private async saveAnswers(questionIds: string[]): Promise<void> {
    const answersInput = this.buildAnswersInput(questionIds);
    await this.supaBase.createAnswers(answersInput);
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

  /** Extracts survey data from the form and converts empty strings to null. */
  private buildSurveyInput(): SurveyInput {
    const formValue = this.surveyForm.value;     // ← lokal, nur in dieser Methode
    return {
      title: formValue.title,
      description: formValue.description || null,
      category: formValue.category || null,
      deadline: formValue.deadline || null
    };
  }

  /** Builds question objects with survey_id and order_index for DB insert. */
  private buildQuestionsInput(surveyId: string): QuestionInput[] {
    return this.questions.value.map((question: { text: string; allow_multiple: boolean }, index: number) => ({
      survey_id: surveyId,
      text: question.text,
      allow_multiple: question.allow_multiple,
      order_index: index
    }));
  }

  /**
 * Builds a flat array of answer objects for DB insert.
 *
 * Uses flatMap to flatten the nested structure:
 * - Input: questions[].answers[] (nested)
 * - Output: answers[] (flat)
 *
 * Each answer is linked to its question via questionIds[index],
 * where index matches the question's position in the form array.
 *
 * Example:
 *   questions[0].answers = [{ text: 'A' }, { text: 'B' }]
 *   questions[1].answers = [{ text: 'X' }]
 *   questionIds = ['id-0', 'id-1']
 *
 *   Result:
 *   [
 *     { question_id: 'id-0', text: 'A', vote_count: 0 },
 *     { question_id: 'id-0', text: 'B', vote_count: 0 },
 *     { question_id: 'id-1', text: 'X', vote_count: 0 }
 *   ]
 */
  private buildAnswersInput(questionIds: string[]): AnswerInput[] {
    return this.questions.value.flatMap((question: { answers: { text: string }[] }, index: number) =>
      question.answers.map(answer => ({
        question_id: questionIds[index],
        text: answer.text,
        vote_count: 0
      }))
    );
  }

}
