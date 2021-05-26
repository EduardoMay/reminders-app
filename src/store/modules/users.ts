// Hooks
import Axios from "@/hook/Axios";
// Services
import UserService from "@/services/UserService";
// Types
import { UserTypes } from "@/types/UserTypes";
import { ReminderTypes } from "@/types/ReminderTypes";
// Interfaces
import { User } from "@/interfaces/User";
// Vuex
import { Commit, Dispatch } from "vuex";

const userService = new UserService();

interface ParametersActions {
  commit: Commit;
  dispatch: Dispatch;
}

interface StateUser {
  user: User;
}

const state = (): StateUser => ({
  user: { email: "" }
});

const actions = {
  async loginUser(
    { commit }: ParametersActions,
    { user }: { user: User }
  ): Promise<boolean> {
    try {
      const {
        status,
        dataUser
      }: {
        status: boolean;
        dataUser?: User;
      } = await userService.login(user);

      if (!status) return false;

      commit(UserTypes.SET_DATA, dataUser);

      new Axios();

      return true;
    } catch ({ response }) {
      return false;
    }
  },
  async relogin({ commit, dispatch }: ParametersActions): Promise<void> {
    const {
      user,
      status
    }: { user: User; status: boolean } = await userService.relogin();
    // TODO verificar el status al hacer relogin

    commit(UserTypes.SET_DATA, user);

    dispatch(
      `${ReminderTypes.GET_REMINDERS}`,
      { idUser: user._id },
      {
        root: true
      }
    );
  },
  async [UserTypes.LOGOUT]({ commit }: ParametersActions): Promise<void> {
    await userService.logout();

    commit(UserTypes.LOGOUT);
  },
  async [UserTypes.REGISTER](
    _: ParametersActions,
    user: User
  ): Promise<string> {
    const message = await userService.register(user);

    return message;
  },
  async [UserTypes.PROFILE](_: ParametersActions, id: string): Promise<any> {
    const data = await userService.profile(id);

    return data;
  }
};

const mutations = {
  async [UserTypes.SET_DATA](state: StateUser, dataUser: User) {
    state.user = dataUser;
  },
  async [UserTypes.LOGOUT](state: StateUser) {
    state.user = { email: "" };
  }
};

const getters = {
  getIdUser(): string {
    return localStorage.idUser;
  }
};

export const UsersModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
