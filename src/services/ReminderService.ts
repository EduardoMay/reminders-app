import Axios from "@/hook/Axios";
import { Reminder } from "@/interfaces/Reminder";

export default class ReminderService {
  public axios = new Axios();

  /**
   * Save new reminder
   * @param reminder
   */
  public async saveReminder(reminder: Reminder): Promise<boolean | Reminder[]> {
    const { data } = await this.axios.post(
      `reminders/${reminder.id_user}`,
      reminder
    );

    const { error, reminders } = data;

    if (error) return false;

    return reminders;
  }

  /**
   * Get all reminders
   * @param idUser
   */
  public async getReminders(idUser: string): Promise<Reminder[]> {
    const { data } = await this.axios.get(`reminders/${idUser}`);

    const { reminders } = data;

    return reminders;
  }
}
