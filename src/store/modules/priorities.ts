import { Priority } from "@/interfaces/Priority";
import { PrioritiesService } from "@/services/PrioritiesService";
import { PrioritiesTypes } from "@/types/PrioritiesTypes";

const priorityService = new PrioritiesService();

const state = () => ({
  priorities: []
});

const actions = {
  async [PrioritiesTypes.GET_PRIORITIES]({ commit }: any) {
    const idUser = localStorage.idUser;

    const priorities: Priority[] = await priorityService.getPriorities(idUser);

    commit(PrioritiesTypes.SET_DATA, { priorities });
  }
};

const mutations = {
  [PrioritiesTypes.SET_DATA](
    state: any,
    { priorities }: { priorities: Priority[] }
  ): void {
    state.priorities = priorities;
  }
};

const getters = {};

export const PrioritiesModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
