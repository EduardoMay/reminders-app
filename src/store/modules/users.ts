import UserService from "@/services/UserService";
import { UserTypes } from "@/types/UserTypes";

const userService = new UserService();

const state = () => ({
  user: {},
  error: ""
});

const actions = {
  async loginUser({ commit }: any, { user }: any): Promise<any> {
    try {
      const { data } = await userService.login(user);
      const { user: dataUser, auth, token } = data;

      if (auth) {
        commit(UserTypes.LOGIN, { dataUser });

        userService.setToken(token);
      }

      return auth;
    } catch ({ response }) {
      return false;
    }
  }
};

const mutations = {
  async [UserTypes.LOGIN](state: any, { dataUser }: any) {
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
