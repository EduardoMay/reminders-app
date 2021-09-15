import Model from '@/extends/Model';
import Axios from '@/hook/Axios';
import { DataPriority, Priority } from '@/interfaces/Priority';

export class PrioritiesService extends Model {
  /**
   * get Priorities
   * @param id string
   */
  public async getPriorities(id: string): Promise<Priority[]> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.get(`priorities/${id}`);
    const {
      error,
      priorities
    }: { error: boolean; priorities: Priority[] } = data;

    if (error) return [];

    return priorities;
  }

  /**
   * Save priority
   * @param {object} priority
   */
  public async savePriority(
    priority: { data: Priority },
    idUser: string
  ): Promise<{ message: string; error: boolean }> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.post(`priorities/${idUser}`, priority);

    if (data.error)
      return { message: 'Ocurrió un error vuelve a intentar', error: true };

    return { message: 'Se guardo correctamente', error: false };
  }

  /**
   * Save priority updated
   * @param dataPriority Data priority
   */
  public async updatePriority(dataPriority: DataPriority): Promise<boolean> {
    const _axios = new Axios(this.idUser);
    const { data: priority }: { data: Priority } = dataPriority;

    const { data } = await _axios.patch(
      `priorities/${priority._id}`,
      String(priority.id_user),
      dataPriority
    );

    return data.error;
  }

  public async deletePriority(
    priority: Priority
  ): Promise<{
    error: boolean;
    priorities: Priority[];
  }> {
    const _axios = new Axios(this.idUser);
    const { _id, id_user } = priority;
    const { data } = await _axios.delete(`priorities/${_id}`, id_user);

    return data;
  }
}
