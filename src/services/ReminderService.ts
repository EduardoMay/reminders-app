import Axios from "@/hook/Axios";
import { Reminder } from "@/interfaces/Reminder";

export default class ReminderService {
  public axios = new Axios();

  /**
   * Guardar recordatorio
   * @param   {Object<Reminder>}  reminder  Datos del recordatorio
   * @return  {Promise<boolean | Array<Reminder>} Regresa false si fallo o regresa todos los recordatorios
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
   * Obtiene todos los reminders
   * @param   {String}  idUser  id del recordatorio
   * @return  {Promise<Reminder[]>} Arreglo de recordatorios
   */
  public async getReminders(idUser: string): Promise<Reminder[]> {
    const { data } = await this.axios.get(`reminders/${idUser}`);

    const { reminders } = data;

    return reminders;
  }
}
