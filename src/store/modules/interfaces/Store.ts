import { PriorityInterface } from '@/interfaces/Priority';
import { ReminderInterface } from '@/interfaces/Reminder';
import { UserInterface } from '@/interfaces/User';
import { Commit, Dispatch } from 'vuex';

export interface ParametersActions {
  commit: Commit;
  dispatch: Dispatch;
  rootState: any;
}

export interface StateUser {
  user: UserInterface;
}

export interface StatePriority {
  priorities: PriorityInterface[];
  idSelected: string;
}

export interface StateReminder {
  reminders: ReminderInterface[];
  idUser: string;
  reminder: ReminderInterface;
}
