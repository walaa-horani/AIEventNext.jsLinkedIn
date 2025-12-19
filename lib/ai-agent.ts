export interface AIEvent {
  name: string;
  description: string;
  category: string;
  venue?: string;
  duration?: string;
  target_audience?: string;
}

export interface GenerateEventResponse {
  event?: AIEvent;
  error?: string;
  is_appropriate?: boolean;
}
