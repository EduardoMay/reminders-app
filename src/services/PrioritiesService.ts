import Axios from "@/hook/Axios";
import { Priority } from "@/interfaces/Priority";

export class PrioritiesService {
  public axios = new Axios();

  /**
   * get Priorities
   * @param id string
   */
  public async getPriorities(id: string): Promise<Priority[]> {
    const { data } = await this.axios.get(`priorities/${id}`);
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
    const { data } = await this.axios.post(`priorities/${idUser}`, priority);

    if (data.error)
      return { message: "Ocurrió un error vuelve a intentar", error: true };

    return { message: "Se guardo correctamente", error: false };
  }
}
