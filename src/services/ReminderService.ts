import Axios from "@/hook/Axios";
import { Reminder } from "@/interfaces/Reminder";

export default class ReminderService {
  public axios = new Axios();

  /**
   * Save new reminders
   * @param   {Reminder}  reminder
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
}
