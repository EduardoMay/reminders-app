// Hooks
import Axios from "@/hook/Axios";
// Services
import UserService from "@/services/UserService";
// Types
import { UserTypes } from "@/types/UserTypes";

const userService = new UserService();

const state = () => ({
  user: {}
});

const actions = {
  async loginUser({ commit }: any, { user }: any): Promise<any> {
    try {
      const { data } = await userService.login(user);
      const { user: dataUser, auth, token } = data;

      if (auth) {
        commit(UserTypes.SET_DATA, { dataUser });

        userService.setToken(token);

        new Axios();
      }

      return auth;
    } catch ({ response }) {
      return false;
    }
  }
};

const mutations = {
  async [UserTypes.SET_DATA](state: any, { dataUser }: any) {
    delete dataUser.createdAt;
    delete dataUser.updatedAt;

    state.user = dataUser;
  }
};

const getters = {};

export const UsersModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
