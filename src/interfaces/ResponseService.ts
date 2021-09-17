import { ReminderInterface } from './Reminder';

export interface ResponseService {
  error: boolean;
  message: string;
  data: ReminderInterface[];
}
