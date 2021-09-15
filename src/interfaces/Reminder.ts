import { PriorityInterface } from './Priority';

export interface ReminderInterface {
  _id?: string;
  id_user: string;
  title: string;
  description: string;
  date_reminder: any;
  priority?: PriorityInterface;
  tags?: Array<any>;
  createdAt?: string;
}
