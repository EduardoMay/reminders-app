// Services
import UserService from '@/services/UserService';
// Types
import { UserTypes } from '@/types/UserTypes';
import { ReminderTypes } from '@/types/ReminderTypes';
// Interfaces
import { UserInterface } from '@/interfaces/User';
// Vuex
import { Commit, Dispatch } from 'vuex';

const userService = new UserService();

interface ParametersActions {
  commit: Commit;
  dispatch: Dispatch;
}

interface StateUser {
  user: UserInterface;
}

const state = (): StateUser => ({
  user: {}
});

const actions = {
  async loginUser(
    { commit }: ParametersActions,
    user: UserInterface
  ): Promise<boolean> {
    try {
      const data = await userService.login(user);

      if (!data) return false;

      commit(UserTypes.SET_DATA, data);

      return true;
    } catch ({ response }) {
      return false;
    }
  },
  async relogin({ commit, dispatch }: ParametersActions): Promise<void> {
    const {
      user,
      status
    }: { user: UserInterface; status: boolean } = await userService.relogin();
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
    user: UserInterface
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
  async setDataUser(state: StateUser, dataUser: UserInterface) {
    state.user = dataUser;
  },
  async logout(state: StateUser) {
    state.user = {};
  }
};

const getters = {
  getIdUser(): string {
    return localStorage.idUser;
  },
  getUser(state: StateUser): UserInterface {
    return state.user;
  }
};

export const UsersModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
