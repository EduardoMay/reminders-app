import { ReminderInterface } from '@/interfaces/Reminder';
import Reminder from '@/services/models/Reminder';
import ReminderService from '@/services/ReminderService';
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
    const { data, error, message } = res;

    if (error) return message;

    commit('saveReminder', data);

    return message;
  },
  async getReminders({ commit }: ParametersActions): Promise<void> {
    const reminders = await reminderService.getReminders();

    commit('getReminders', reminders);
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
