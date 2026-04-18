import { Component, inject, signal } from '@angular/core';
import { Supabase } from '../../services/supabase.service';
import { Survey } from '../../models/survey.model';
import { JsonPipe } from '@angular/common';
import { SurveyCardSmall } from './survey-card-small/survey-card-small';
import { UiButtonComponent } from '../../shared/ui-button/ui-button';
import { SurveyFilterComponent } from './survey-filter/survey-filter';
import { SurveySortComponent } from './survey-sort/survey-sort';

@Component({
  selector: 'app-home',
  imports: [JsonPipe, SurveyCardSmall, UiButtonComponent, SurveyFilterComponent, SurveySortComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private dbSupabase = inject(Supabase);
  surveys = signal<Survey[]>([]);

  async getSurveys(): Promise<void> {
    const { data } = await this.dbSupabase.getSurveys();
    this.surveys.set(data ?? []);

  }

  async ngOnInit() {
    await this.getSurveys();
  }
}
