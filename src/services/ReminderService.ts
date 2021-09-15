import Model from '@/extends/Model';
import Axios from '@/hook/Axios';
import { RemindersRoutesAPi } from '@/hook/reminders.routes';
import { ReminderInterface } from '@/interfaces/Reminder';
import { ResponseApi } from '@/interfaces/ResponseApi';

export default class ReminderService extends Model {
  /**
   * Save new reminder
   * @param reminder
   */
  public async saveReminder(
    reminder: ReminderInterface
  ): Promise<boolean | ReminderInterface[]> {
    const _axios = new Axios(this.idUser);
    const res = await _axios.post(RemindersRoutesAPi.CREATE, reminder);

    const { data, error }: ResponseApi = res.data;

    if (error) return false;

    return data;
  }

  /**
   * Get all reminders
   */
  public async getReminders(): Promise<ReminderInterface[] | boolean> {
    const _axios = new Axios(this.idUser);
    const res = await _axios.get(RemindersRoutesAPi.REMINDERS);

    const { data, error }: ResponseApi = res.data;

    if (error) return false;

    return data;
  }
}
