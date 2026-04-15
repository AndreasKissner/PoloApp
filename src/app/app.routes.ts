import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { SurveyDetail } from './features/survey-detail/survey-detail';

export const routes: Routes = [
    {path : '', component:Home},
    {path : '/survey/:id' , component : SurveyDetail }
];
