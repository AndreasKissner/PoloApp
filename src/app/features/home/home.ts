import { Component, inject, signal, computed } from '@angular/core';
import { Supabase } from '../../services/supabase.service';
import { Survey } from '../../models/survey.model';
import { SurveyCardSmall } from './survey-card-small/survey-card-small';
import { UiButtonComponent } from '../../shared/ui-button/ui-button';
import { SurveyFilterComponent } from './survey-filter/survey-filter';
import { SurveySortComponent } from './survey-sort/survey-sort';
import { SurveyCardLarge } from './survey-card-large/survey-card-large';
import { HeroIllustration } from './hero-illustration/hero-illustration';
import { Header } from '../../shared/header/header';
import { RouterLink } from '@angular/router';
import { isPast, daysUntilDeadline } from '../../utils/survey-utils';

@Component({
  selector: 'app-home',
  imports: [SurveyCardSmall, UiButtonComponent, SurveyFilterComponent, SurveySortComponent, SurveyCardLarge, HeroIllustration, Header, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private readonly ENDING_SOON_LIMIT = 3;

  private dbSupabase = inject(Supabase);

  surveys = signal<Survey[]>([]);
  activeTab = signal<'active' | 'past'>('active');
  selectedCategory = signal<string | null>(null);

  activeSurveys = computed(() => this.surveys().filter(s => !isPast(s)));
  pastSurveys = computed(() => this.surveys().filter(s => isPast(s)));
  endingSoonSurveys = computed(() => this.getEndingSoon());

  currentSurveys = computed(() => {
    const base = this.activeTab() === 'active' ? this.activeSurveys() : this.pastSurveys();
    const category = this.selectedCategory();
    if (!category) {
      return base;
    }
    return base.filter(s => s.category === category);
  });

  availableCategories = computed(() => {
    const cats = this.surveys()
      .map(s => s.category)
      .filter((c): c is string => c !== null);
    return [...new Set(cats)];
  });

  async ngOnInit(): Promise<void> {
    await this.getSurveys();
  }

  /** Loads all surveys from the database. */
  async getSurveys(): Promise<void> {
    const { data } = await this.dbSupabase.getSurveys();
    this.surveys.set(data ?? []);
  }

  /** Switches between active and past tab. */
  setTab(tab: 'active' | 'past'): void {
    this.activeTab.set(tab);
  }

  /** Returns top N active surveys with the closest deadline. */
  private getEndingSoon(): Survey[] {
    return this.activeSurveys()
      .filter(s => s.deadline !== null)
      .sort((a, b) => (daysUntilDeadline(a) ?? 0) - (daysUntilDeadline(b) ?? 0))
      .slice(0, this.ENDING_SOON_LIMIT);
  }

  /** Sets the selected category filter. Null means show all. */
  onCategorySelected(category: string | null): void {
    this.selectedCategory.set(category);
  }
}