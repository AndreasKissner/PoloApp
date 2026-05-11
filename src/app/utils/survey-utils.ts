import { Survey } from '../models/survey.model';
import { AbstractControl, ValidationErrors } from '@angular/forms';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Checks if a survey's deadline has passed. */
export function isPast(survey: Survey): boolean {
  if (!survey.deadline) {
    return false;
  }
  return new Date(survey.deadline) < new Date();
}

/** Returns days remaining until deadline. Negative if past, null if no deadline. */
export function daysUntilDeadline(survey: Survey): number | null {
  if (!survey.deadline) {
    return null;
  }
  const diff = new Date(survey.deadline).getTime() - new Date().getTime();
  return Math.ceil(diff / MS_PER_DAY);
}

/** Formats deadline as "Ends in X Days", "Ends today" or "Ended". */
export function formatDeadline(survey: Survey): string {
  const days = daysUntilDeadline(survey);
  if (days === null) {
    return 'No deadline';
  }
  if (days < 0) {
    return 'Ended';
  }
  if (days === 0) {
    return 'Ends today';
  }
  return `Ends in ${days} ${days === 1 ? 'Day' : 'Days'}`;
}

export const SURVEY_CATEGORIES: string[] = [
  'Team Activities',
  'Health & Wellness',
  'Gaming & Entertainment',
  'Education & Learning',
  'Lifestyle & Preferences',
  'Technology & Innovation'
];

export const TITLE_MAX_LENGTH = 120;
export const DESCRIPTION_MAX_LENGTH = 500;
export const QUESTION_MAX_LENGTH = 200;
export const ANSWER_MAX_LENGTH = 100;

/** Validator that rejects empty strings and whitespace-only input. */
export function requiredNoWhitespace(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === undefined) {
    return { required: true };
  }
  if (typeof value === 'string' && value.trim().length === 0) {
    return { required: true };
  }
  return null;
}

const VOTED_STORAGE_KEY = 'voted_surveys';

/** Checks if the user has already voted on a survey. */
export function hasVoted(surveyId: string): boolean {
  const voted = getVotedSurveys();
  return voted.includes(surveyId);
}

/** Marks a survey as voted in localStorage. */
export function markAsVoted(surveyId: string): void {
  const voted = getVotedSurveys();
  if (!voted.includes(surveyId)) {
    voted.push(surveyId);
    localStorage.setItem(VOTED_STORAGE_KEY, JSON.stringify(voted));
  }
}

/** Reads the list of voted survey IDs from localStorage. */
function getVotedSurveys(): string[] {
  const stored = localStorage.getItem(VOTED_STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}