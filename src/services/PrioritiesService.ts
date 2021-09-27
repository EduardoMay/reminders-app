import Axios from '@/hook/Axios';
import { PrioritiesRoutesAPi } from '@/services/routes/priorities.routes';
import { PriorityInterface } from '@/interfaces/Priority';
import ResponseApi, { ResponseApiInterface } from '@/interfaces/ResponseApi';
import Model from './models/Model';

export class PrioritiesService extends Model {
  /**
   * get Priorities
   */
  public async getPriorities(): Promise<PriorityInterface[] | boolean> {
    const _axios = new Axios(this.idUser);
    const res = await _axios.get(PrioritiesRoutesAPi.PRIORITIES);

    const { error, data } = new ResponseApi<PriorityInterface[]>(res.data);

    if (error) return false;

    return data;
  }

  /**
   * Save priority
   * @param priority data priority
   */
  public async savePriority(
    priority: PriorityInterface
  ): Promise<ResponseApiInterface<PriorityInterface[]>> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.post(PrioritiesRoutesAPi.CREATE, priority);

    const response = new ResponseApi<PriorityInterface[]>(data);

    return response;
  }

  /**
   * Save priority updated
   * @param priority Data priority
   */
  public async updatePriority(
    priority: any
  ): Promise<ResponseApiInterface<PriorityInterface[]>> {
    const _axios = new Axios(this.idUser);

    const { data } = await _axios.patch(
      PrioritiesRoutesAPi.UPDATE,
      priority.id,
      priority
    );

    const response = new ResponseApi<PriorityInterface[]>(data);

    return response;
  }

  /**
   * delete priority
   * @param priority data priority
   * @returns data or status
   */
  public async deletePriority(
    id: string
  ): Promise<ResponseApiInterface<PriorityInterface[]>> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.delete(PrioritiesRoutesAPi.DELETE, id);

    const response = new ResponseApi<PriorityInterface[]>(data);

    return response;
  }
}
