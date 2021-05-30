import Axios from "@/hook/Axios";
import { DataPriority, Priority } from "@/interfaces/Priority";

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

  /**
   * Save priority updated
   * @param dataPriority Data priority
   */
  public async updatePriority(dataPriority: DataPriority): Promise<boolean> {
    const { data: priority }: { data: Priority } = dataPriority;

    const { data } = await this.axios.patch(
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
    const { _id, id_user } = priority;
    const { data } = await this.axios.delete(`priorities/${_id}`, id_user);

    return data;
  }
}
