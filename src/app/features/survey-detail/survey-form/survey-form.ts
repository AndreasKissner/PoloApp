import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '../../../shared/ui-button/ui-button';

@Component({
  selector: 'app-survey-form',
  imports: [UiButtonComponent, RouterLink],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {

 
}
