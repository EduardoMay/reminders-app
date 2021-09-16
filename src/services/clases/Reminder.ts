import { PriorityInterface } from '@/interfaces/Priority';
import { ReminderInterface } from '@/interfaces/Reminder';

export default class Reminder {
  public _id = '';
  public id_user = '';
  public title = '';
  public description = '';
  public date_reminder: any;
  public priority: PriorityInterface = {
    id_user: '',
    title: '',
    color: ''
  };
  public tags: Array<any> = [];

  public set reminder(reminder: ReminderInterface) {
    this._id = reminder._id || '';
    this.id_user = reminder.id_user || '';
    this.title = reminder.title || '';
    this.description = reminder.description || '';
    this.date_reminder = reminder.date_reminder;
    this.priority = reminder.priority || {
      id_user: '',
      title: '',
      color: ''
    };
    this.tags = reminder.tags || [];
  }

  public load(reminder: ReminderInterface) {
    this.reminder = { ...reminder };
  }
}
