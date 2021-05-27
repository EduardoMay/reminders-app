// Interfaces
import { Priority } from "@/interfaces/Priority";
import { User } from "@/interfaces/User";
// Service
import { PrioritiesService } from "@/services/PrioritiesService";
// Types
import { PrioritiesTypes } from "@/types/PrioritiesTypes";
// vuex
import { Commit } from "vuex";

const priorityService = new PrioritiesService();

interface ParametersActions {
  commit: Commit;
  rootState: any;
}

interface StatePriority {
  priorities: Priority[];
  prioritySelected: Priority;
}

const state = (): StatePriority => ({
  priorities: [],
  prioritySelected: { id_user: "", title: "", color: "" }
});

const actions = {
  async [PrioritiesTypes.GET_PRIORITIES]({ commit }: ParametersActions) {
    const idUser = localStorage.idUser;

    const priorities: Priority[] = await priorityService.getPriorities(idUser);

    commit(PrioritiesTypes.SET_DATA, priorities);
  },
  async [PrioritiesTypes.SAVE_REMINDERS](
    { rootState }: ParametersActions,
    priority: Priority
  ) {
    const { _id }: User = rootState.UsersModule.user;
    priority.id_user = String(_id);
    const data = { data: priority };

    const res = await priorityService.savePriority(data, priority.id_user);

    return res;
  },
  async [PrioritiesTypes.SAVE_REMINDERS](
    _: ParametersActions,
    priority: Priority
  ) {
    console.log(priority);
    // TODO Llamar al servicio para guardar el Priority editado
  }
};

const mutations = {
  [PrioritiesTypes.SET_DATA](
    state: StatePriority,
    priorities: Priority[]
  ): void {
    state.priorities = priorities;
  },
  [PrioritiesTypes.SET_PRIORITY](state: StatePriority, priority: Priority) {
    state.prioritySelected = priority;
  }
};

const getters = {
  [PrioritiesTypes.GET_PRIORITY](state: StatePriority) {
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
