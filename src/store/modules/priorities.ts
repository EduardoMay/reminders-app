import { Commit } from 'vuex';
import { PrioritiesService } from '@/services/PrioritiesService';
import { PriorityInterface } from '@/interfaces/Priority';

const priorityService = new PrioritiesService();

interface ParametersActions {
  commit: Commit;
  rootState: any;
}

interface StatePriority {
  priorities: PriorityInterface[];
  idSelected: string;
}

const state = (): StatePriority => ({
  priorities: [],
  idSelected: ''
});

const actions = {
  async getPriorities({ commit }: ParametersActions) {
    const priorities = await priorityService.getPriorities();

    commit('setData', priorities);
  },
  async savePriority(
    { commit }: ParametersActions,
    priority: PriorityInterface
  ): Promise<string | undefined> {
    const { error, data, message } = await priorityService.savePriority(
      priority
    );

    if (error) return message;

    commit('setData', data);
  },
  async updatePriority(_: ParametersActions, dataPriority: any) {
    return await priorityService.updatePriority(dataPriority);
  },
  async deletePriority(
    { commit }: ParametersActions,
    id: string
  ): Promise<string> {
    const { message, data } = await priorityService.deletePriority(id);

    commit('setData', data);

    return message;
  }
};

const mutations = {
  setData(state: StatePriority, priorities: PriorityInterface[]): void {
    state.priorities = priorities;
  },
  setSelected(state: StatePriority, id: string) {
    state.idSelected = id;
  }
};

const getters = {
  getPrioritySelected(state: StatePriority) {
    return state.priorities.find(
      (priority) => priority._id === state.idSelected
    );
  },
  priorities(state: StatePriority) {
    return state.priorities;
  }
};

export const PrioritiesModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
