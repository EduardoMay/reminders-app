import { PriorityInterface } from '@/interfaces/Priority';
import { ReminderInterface } from '@/interfaces/Reminder';

export default class Reminder {
  public _id = '';
  public id_user = '';
  public title = '';
  public description = '';
  public dateReminder: any;
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
    this.dateReminder = reminder.dateReminder;
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

  public validateNew(): boolean {
    return (
      this.title === '' || this.description === '' || this.dateReminder === ''
    );
  }
}
