import { PriorityInterface } from './Priority';

export interface ReminderInterface {
  _id?: string;
  id_user: string;
  title: string;
  description: string;
  dateReminder: any;
  priority?: PriorityInterface;
  tags?: Array<any>;
  createdAt?: string;
}
