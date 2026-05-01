import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
import { SurveyInput, QuestionInput } from '../models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class Supabase {

private SUPABASE = createClient(environment.supabaseUrl, environment.supabaseKey)

async getSurveys(){
  return await this.SUPABASE.from('surveys').select('*')
}

/** Creates a new survey and returns the generated ID. */
async createSurvey(survey: SurveyInput): Promise<string> {
  const { data, error } = await this.SUPABASE
    .from('surveys')
    .insert(survey)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
}

/** Creates multiple questions and returns IDs sorted by order_index. */
async createQuestions(questions: QuestionInput[]): Promise<string[]> {
  const { data, error } = await this.SUPABASE
    .from('questions')
    .insert(questions)
    .select('id, order_index')
    .order('order_index', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(q => q.id);
}
 
}