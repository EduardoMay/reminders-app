// Services
import ReminderService from "@/services/ReminderService";

// Types
import { ReminderTypes } from "@/types/ReminderTypes";

const reminderService = new ReminderService();

const state = () => ({
  reminders: [],
  idUser: ""
});

const actions = {
  async [ReminderTypes.SAVE_REMINDER]({ commit }: any, { newReminder }: any) {
    const reminders = await reminderService.saveReminder(newReminder);

    if (!reminders) return false;

    commit(ReminderTypes.SAVE_REMINDER, { reminders });

    return true;
  },
  async [ReminderTypes.GET_REMINDERS](
    { commit }: any,
    { idUser }: any
  ): Promise<void> {
    const reminders = await reminderService.getReminders(idUser);

    commit(ReminderTypes.GET_REMINDERS, reminders);
  }
};

const mutations = {
  [ReminderTypes.SAVE_REMINDER](state: any, { reminders }: any) {
    state.reminders = reminders;
  },
  async [ReminderTypes.GET_REMINDERS](state: any, reminders: any) {
    state.reminders = reminders;
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
