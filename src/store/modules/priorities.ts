// Interfaces
import { Priority } from "@/interfaces/Priority";
// Service
import { PrioritiesService } from "@/services/PrioritiesService";
// Types
import { PrioritiesTypes } from "@/types/PrioritiesTypes";
// vuex
import { Commit } from "vuex";

const priorityService = new PrioritiesService();

interface ParametersActions {
  commit: Commit;
}

interface StatePriority {
  priorities: Priority[];
}

const state = (): StatePriority => ({
  priorities: []
});

const actions = {
  async [PrioritiesTypes.GET_PRIORITIES]({ commit }: ParametersActions) {
    const idUser = localStorage.idUser;

    const priorities: Priority[] = await priorityService.getPriorities(idUser);

    commit(PrioritiesTypes.SET_DATA, priorities);
  }
};

const mutations = {
  [PrioritiesTypes.SET_DATA](
    state: StatePriority,
    priorities: Priority[]
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
