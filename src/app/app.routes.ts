import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { SurveyDetail } from './features/survey-detail/survey-detail';
import { NewSurvey } from './features/new-survey/new-survey';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'survey/:id', component: SurveyDetail },
    { path: 'new-survey', component: NewSurvey }
];