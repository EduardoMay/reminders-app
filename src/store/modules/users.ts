import UserService from '@/services/UserService';
import { UserInterface } from '@/interfaces/User';
import { ParametersActions, StateUser } from './interfaces/Store';

const userService = new UserService();

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

      commit('setDataUser', data);

      return true;
    } catch ({ response }) {
      return false;
    }
  },
  async relogin({ commit, dispatch }: ParametersActions): Promise<void> {
    const user = await userService.relogin();

    commit('setDataUser', user);

    dispatch('getReminders', null, {
      root: true
    });
  },
  async logout({ commit }: ParametersActions): Promise<void> {
    await userService.logout();

    commit('logout');
  },
  async registerUser(
    _: ParametersActions,
    user: UserInterface
  ): Promise<Array<any>> {
    const res = await userService.register(user);

    return res;
  },
  async profile(_: ParametersActions, id: string): Promise<any> {
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
