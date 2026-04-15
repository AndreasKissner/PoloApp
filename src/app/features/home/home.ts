import { Component, inject, signal } from '@angular/core';
import { Supabase } from '../../services/supabase.service';
import { Survey } from '../../models/survey.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
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
