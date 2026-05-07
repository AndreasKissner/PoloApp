import { Survey } from '../models/survey.model';

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