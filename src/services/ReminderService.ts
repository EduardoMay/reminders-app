import Model from '@/extends/Model';
import Axios from '@/hook/Axios';
import { Reminder } from '@/interfaces/Reminder';

export default class ReminderService extends Model {
  public _axios: Axios;

  constructor() {
    super();
    this._axios = new Axios(this.idUser);
  }

  /**
   * Save new reminder
   * @param reminder
   */
  public async saveReminder(reminder: Reminder): Promise<boolean | Reminder[]> {
    const { data } = await this._axios.post(`reminders`, reminder);

    const { error, reminders } = data;

    if (error) return false;

    return reminders;
  }

  /**
   * Get all reminders
   * @param idUser
   */
  public async getReminders(idUser: string): Promise<Reminder[]> {
    const { data } = await this._axios.get(`reminders`);

    const { reminders } = data;

    return reminders;
  }
}
