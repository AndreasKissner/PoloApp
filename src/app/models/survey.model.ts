export interface Survey {
    id: string;
    created_at: string;
    title: string;
    description: string | null;
    category: string | null;
    deadline: string | null;
}

export type SurveyInput = Omit<Survey, 'id' | 'created_at'>;

export interface Question {
    id: string;
    created_at: string;
    survey_id: string;
    text: string;
    allow_multiple: boolean;
    order_index: number;
}

export type QuestionInput = Omit<Question, 'id' | 'created_at'>;

export interface Answer {
    id: string;
    created_at: string;
    question_id : string;
    text:string;
    vote_count: number;
}