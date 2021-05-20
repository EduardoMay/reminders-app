// Hooks
import Axios from "@/hook/Axios";
// Services
import UserService from "@/services/UserService";
// Types
import { UserTypes } from "@/types/UserTypes";
import { ReminderTypes } from "@/types/ReminderTypes";

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
  },
  async relogin({ commit, dispatch }: any): Promise<any> {
    const dataUser = await userService.relogin();

    commit(UserTypes.SET_DATA, { dataUser });

    dispatch(
      `${ReminderTypes.GET_REMINDERS}`,
      { idUser: dataUser._id },
      {
        root: true
      }
    );
  },
  async [UserTypes.LOGOUT]({ commit }: any): Promise<void> {
    await userService.logout();

    commit(UserTypes.LOGOUT);
  },
  async [UserTypes.REGISTER]({ commit }: any, { user }: any): Promise<any> {
    const { data } = await userService.register(user);

    const { message } = data;

    if (message) return message;
  },
  async [UserTypes.PROFILE](
    { commit }: any,
    { id }: { id: string }
  ): Promise<any> {
    const data = await userService.profile(id);

    console.log(data);
  }
};

const mutations = {
  async [UserTypes.SET_DATA](state: any, { dataUser }: any) {
    delete dataUser.createdAt;
    delete dataUser.updatedAt;

    state.user = dataUser;
  },
  async [UserTypes.LOGOUT](state: any) {
    state.user = {};
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
