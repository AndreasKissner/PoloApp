import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Supabase {

private SUPABASE = createClient(environment.supabaseUrl, environment.supabaseKey)

async getSurveys(){
  return await this.SUPABASE.from('surveys').select('*')
}

}