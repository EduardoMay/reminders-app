import Model from '@/extends/Model';
import Axios from '@/hook/Axios';
import { RemindersRoutesAPi } from '@/services/routes/reminders.routes';
import { ReminderInterface } from '@/interfaces/Reminder';
import ResponseApi, { ResponseApiInterface } from '@/interfaces/ResponseApi';

export default class ReminderService extends Model {
  /**
   * Save new reminder
   * @param reminder
   */
  public async saveReminder(
    reminder: ReminderInterface
  ): Promise<ResponseApiInterface<ReminderInterface>> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.post(RemindersRoutesAPi.CREATE, reminder);

    const response = new ResponseApi(data);

    return response;
  }

  /**
   * Get all reminders
   */
  public async getReminders(): Promise<ReminderInterface[] | boolean> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.get(RemindersRoutesAPi.REMINDERS);

    const { error } = new ResponseApi<ReminderInterface[]>(data);

    if (error) return false;

    return data;
  }
}
