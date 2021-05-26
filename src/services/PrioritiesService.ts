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
}
