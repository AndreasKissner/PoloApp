import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
import { Survey, Question, Answer, SurveyInput, QuestionInput, AnswerInput } from '../models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class Supabase {

  private SUPABASE = createClient(environment.supabaseUrl, environment.supabaseKey)

  async getSurveys() {
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

  /** Creates multiple answers in bulk. */
  async createAnswers(answers: AnswerInput[]): Promise<void> {
    const { error } = await this.SUPABASE
      .from('answers')
      .insert(answers);

    if (error) {
      throw new Error(error.message);
    }
  }

  /** Loads a single survey by its ID. */
  async getSurveyById(id: string): Promise<Survey> {
    const { data, error } = await this.SUPABASE
      .from('surveys')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /** Loads all questions of a survey, sorted by order_index. */
  async getQuestionsBySurveyId(surveyId: string): Promise<Question[]> {
    const { data, error } = await this.SUPABASE
      .from('questions')
      .select('*')
      .eq('survey_id', surveyId)
      .order('order_index', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /** Loads all answers belonging to the given question IDs. */
  async getAnswersByQuestionIds(questionIds: string[]): Promise<Answer[]> {
    const { data, error } = await this.SUPABASE
      .from('answers')
      .select('*')
      .in('question_id', questionIds);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /** Increments vote_count of an answer by 1. */
  async incrementVote(answerId: string): Promise<void> {
    const current = await this.SUPABASE
      .from('answers')
      .select('vote_count')
      .eq('id', answerId)
      .single();

    if (current.error) {
      throw new Error(current.error.message);
    }

    await this.updateVoteCount(answerId, current.data.vote_count + 1);
  }

  /** Updates the vote_count of an answer to a specific value. */
  private async updateVoteCount(answerId: string, newCount: number): Promise<void> {
    const { error } = await this.SUPABASE
      .from('answers')
      .update({ vote_count: newCount })
      .eq('id', answerId);

    if (error) {
      throw new Error(error.message);
    }
  }
}