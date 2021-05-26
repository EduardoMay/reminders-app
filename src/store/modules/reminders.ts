// Interfaces
import { Reminder } from "@/interfaces/Reminder";
// Services
import ReminderService from "@/services/ReminderService";
// Types
import { ReminderTypes } from "@/types/ReminderTypes";
// Store
import { Commit } from "vuex";

const reminderService = new ReminderService();

interface ParametersActions {
  commit: Commit;
}

interface StateReminder {
  reminders: Reminder[];
  idUser: string;
}

const state = (): StateReminder => ({
  reminders: [],
  idUser: ""
});

const actions = {
  async [ReminderTypes.SAVE_REMINDER](
    { commit }: ParametersActions,
    { newReminder }: { newReminder: Reminder }
  ) {
    const reminders = await reminderService.saveReminder(newReminder);

    if (!reminders) return false;

    commit(ReminderTypes.SAVE_REMINDER, reminders);

    return true;
  },
  async [ReminderTypes.GET_REMINDERS](
    { commit }: ParametersActions,
    { idUser }: { idUser: string }
  ): Promise<void> {
    const reminders = await reminderService.getReminders(idUser);

    commit(ReminderTypes.GET_REMINDERS, reminders);
  }
};

const mutations = {
  [ReminderTypes.SAVE_REMINDER](state: StateReminder, reminders: Reminder[]) {
    state.reminders = reminders;
  },
  async [ReminderTypes.GET_REMINDERS](
    state: StateReminder,
    reminders: Reminder[]
  ) {
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
