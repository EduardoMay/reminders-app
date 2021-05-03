// Services
import ReminderService from "@/services/ReminderService";

// Types
import { ReminderTypes } from "@/types/ReminderTypes";

const reminderService = new ReminderService();

const state = () => ({
  reminders: []
});

const actions = {
  async [ReminderTypes.SAVE_REMINDER]({ commit }: any, { newReminder }: any) {
    const res = await reminderService.saveReminder(newReminder);

    if (!res) return false;

    commit(ReminderTypes.SAVE_REMINDER, { res });

    return true;
  }
};

const mutations = {
  [ReminderTypes.SAVE_REMINDER](state: any, { res: reminders }: any) {
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
