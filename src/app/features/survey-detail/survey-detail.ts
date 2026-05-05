import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../../shared/header/header';
import { SurveyForm } from './survey-form/survey-form';
import { SurveyResults } from './survey-results/survey-results';
import { Supabase } from '../../services/supabase.service';
import { Survey, Question, Answer } from '../../models/survey.model';

@Component({
  selector: 'app-survey-detail',
  imports: [Header, SurveyForm, SurveyResults],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss',
})
export class SurveyDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private supabase = inject(Supabase);

  survey = signal<Survey | null>(null);
  questions = signal<Question[]>([]);
  answers = signal<Answer[]>([]);
  resultsOpen = signal(false);
  arrowOrange = signal(false);
  isRotating = signal(false);

  /*  isDesktop = signal(window.innerWidth >= 1024); */
  isDesktop = signal(true);

  resultsVisible = computed(() => this.isDesktop() || this.resultsOpen());

  toggleResults(): void {
    this.isRotating.set(true);
    this.arrowOrange.set(false);

    setTimeout(() => {
      this.isRotating.set(false);
      this.resultsOpen.update(value => !value);
    }, 600);
  }

  ngOnInit(): void {
    this.loadSurveyData();
  }

  /** Loads survey, questions and answers based on the route ID. */
  private async loadSurveyData(): Promise<void> {
    const surveyId = this.route.snapshot.paramMap.get('id');
    if (!surveyId) {
      return;
    }

    try {
      await this.fetchAllData(surveyId);
    } catch (error) {
      console.error('Failed to load survey:', error);
    }
  }

  /** Fetches survey, questions and answers in sequence. */
  private async fetchAllData(surveyId: string): Promise<void> {
    const survey = await this.supabase.getSurveyById(surveyId);
    const questions = await this.supabase.getQuestionsBySurveyId(surveyId);
    const questionIds = questions.map(q => q.id);
    const answers = await this.supabase.getAnswersByQuestionIds(questionIds);

    this.survey.set(survey);
    this.questions.set(questions);
    this.answers.set(answers);
    console.log('Loaded:', survey, questions, answers);
  }
}