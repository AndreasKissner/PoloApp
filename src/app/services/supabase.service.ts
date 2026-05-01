import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
import { SurveyInput } from '../models/survey.model';

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
 
}