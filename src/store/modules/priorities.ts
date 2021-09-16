import { Commit } from 'vuex';
import { PrioritiesService } from '@/services/PrioritiesService';
import { PrioritiesTypes } from '@/types/PrioritiesTypes';
import { PriorityInterface } from '@/interfaces/Priority';
import { UserInterface } from '@/interfaces/User';

const priorityService = new PrioritiesService();

interface ParametersActions {
  commit: Commit;
  rootState: any;
}

interface StatePriority {
  priorities: PriorityInterface[];
  prioritySelected: PriorityInterface;
}

const state = (): StatePriority => ({
  priorities: [],
  prioritySelected: { id_user: '', title: '', color: '' }
});

const actions = {
  async getPriorities({ commit }: ParametersActions) {
    const idUser = localStorage.idUser;

    // const priorities: PriorityInterface[] = await priorityService.getPriorities(
    //   idUser
    // );

    // commit(PrioritiesTypes.SET_DATA, priorities);
  },
  async savePriority(
    { rootState }: ParametersActions,
    priority: PriorityInterface
  ) {
    const { _id }: UserInterface = rootState.UsersModule.user;
    priority.id_user = String(_id);
    const data = { data: priority };

    // const res = await priorityService.savePriority(data, priority.id_user);

    // return res;
  },
  async updatePriority(_: ParametersActions, dataPriority: any) {
    return await priorityService.updatePriority(dataPriority);
  },
  async deletePriority(
    { commit }: ParametersActions,
    priority: PriorityInterface
  ): Promise<string> {
    const {
      error,
      priorities
    }: {
      error: boolean;
      priorities: PriorityInterface[];
    } = await priorityService.deletePriority(priority);

    if (error) {
      return 'Ah ocurrido un error vuelva a intentarlo nuevamente';
    }

    commit(PrioritiesTypes.SET_DATA, priorities);

    return 'Se ha borrado correctamente';
  }
};

const mutations = {
  setData(state: StatePriority, priorities: PriorityInterface[]): void {
    state.priorities = priorities;
  },
  setPriority(state: StatePriority, priority: PriorityInterface) {
    state.prioritySelected = priority;
  }
};

const getters = {
  getPriority(state: StatePriority) {
    return state.prioritySelected;
  }
};

export const PrioritiesModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
