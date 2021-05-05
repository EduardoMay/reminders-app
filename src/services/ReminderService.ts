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

  /**
   * Get all reminders by id user
   * @param   {string}              idUser
   * @return  {Promise<Reminder>[]}
   */
  public async getReminders(idUser: string): Promise<Reminder[]> {
    const { data } = await this.axios.get(`reminders/${idUser}`);

    const { reminders } = data;

    return reminders;
  }
}
