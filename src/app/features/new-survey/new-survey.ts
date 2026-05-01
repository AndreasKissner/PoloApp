import { Component, inject} from '@angular/core';
import { Header } from '../../shared/header/header';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '../../shared/ui-button/ui-button';
import { SurveyQuestion } from './survey-question/survey-question';
import { SurveySortComponent } from '../home/survey-sort/survey-sort';
import { DeleteBtn } from '../../shared/delete-btn/delete-btn';

import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-survey',
  imports: [Header,RouterLink, UiButtonComponent, SurveyQuestion, SurveySortComponent, DeleteBtn, ReactiveFormsModule],
  templateUrl: './new-survey.html',
  styleUrl: './new-survey.scss',
})
export class NewSurvey {

private formBuilder = inject(FormBuilder);

  onCategorySelected(category: string) {
  // survey.category = category
}
}
