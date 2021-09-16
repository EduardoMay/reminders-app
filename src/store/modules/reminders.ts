// Interfaces
import { ReminderInterface } from '@/interfaces/Reminder';
import Reminder from '@/services/clases/Reminder';
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
  async [ReminderTypes.SAVE_REMINDER](
    { commit }: ParametersActions,
    { newReminder }: { newReminder: ReminderInterface }
  ) {
    const reminders = await reminderService.saveReminder(newReminder);

    if (!reminders) return false;

    commit(ReminderTypes.SAVE_REMINDER, reminders);

    return true;
  },
  async [ReminderTypes.GET_REMINDERS]({
    commit
  }: ParametersActions): Promise<void> {
    const reminders = await reminderService.getReminders();

    commit(ReminderTypes.GET_REMINDERS, reminders);
  }
};

const mutations = {
  [ReminderTypes.SAVE_REMINDER](
    state: StateReminder,
    reminders: ReminderInterface[]
  ) {
    state.reminders = reminders;
  },
  async [ReminderTypes.GET_REMINDERS](
    state: StateReminder,
    reminders: ReminderInterface[]
  ) {
    state.reminders = reminders;
  },
  [ReminderTypes.GET_REMINDER](
    state: StateReminder,
    reminder: ReminderInterface
  ) {
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
