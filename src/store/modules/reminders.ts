// Interfaces
import { ReminderInterface } from '@/interfaces/Reminder';
import Reminder from '@/services/models/Reminder';
// Services
import ReminderService from '@/services/ReminderService';
// Types
import { ReminderTypes } from '@/types/ReminderTypes';
// Store
import { Commit } from 'vuex';

const reminderService = new ReminderService();

interface ParametersActions {
  commit: Commit;
}

interface StateReminder {
  reminders: ReminderInterface[];
  idUser: string;
  reminder: ReminderInterface;
}

const state = (): StateReminder => ({
  reminders: [],
  idUser: '',
  reminder: new Reminder()
});

const actions = {
  async saveReminder(
    { commit }: ParametersActions,
    reminder: ReminderInterface
  ) {
    const res = await reminderService.saveReminder(reminder);

    if (!res) return false;

    commit(ReminderTypes.SAVE_REMINDER, res);

    return true;
  },
  async getReminders({ commit }: ParametersActions): Promise<void> {
    const reminders = await reminderService.getReminders();

    commit(ReminderTypes.GET_REMINDERS, reminders);
  }
};

const mutations = {
  saveReminder(state: StateReminder, reminders: ReminderInterface[]) {
    state.reminders = reminders;
  },
  async getReminders(state: StateReminder, reminders: ReminderInterface[]) {
    state.reminders = reminders;
  },
  getReminder(state: StateReminder, reminder: ReminderInterface) {
    state.reminder = reminder;
  }
};

const getters = {};

export const RemindersModules = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
