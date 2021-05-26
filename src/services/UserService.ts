import Axios from "@/hook/Axios";
import { User } from "@/interfaces/User";
import { AxiosResponse } from "axios";

export default class UserService {
  public axios = new Axios();
  readonly BASE_URL_API = process.env.VUE_APP_BASE_URL_API;

  /**
   * verify token
   */
  public async verifyToken(): Promise<boolean> {
    let status = false;

    try {
      const { data } = await this.axios.get(`users/verify`);
      const { auth, token } = data;

      if (auth) {
        this.setToken(token);

        status = true;
      } else status = false;
    } catch ({ response }) {
      this.clearToken();
      status = false;
    }

    return status;
  }

  /**
   * Login user
   * @param user
   * @return  {*}
   */
  public async login(
    user: User
  ): Promise<{ status: boolean; dataUser?: User }> {
    const { data } = await this.axios.post("users/login", user);
    const { error, auth, token, user: dataUser } = data;

    if (error && !auth) return { status: false };

    this.setToken(token);
    this.setIdUser(dataUser._id);

    return { dataUser, status: true };
  }

  /**
   * Register new user
   * @param user
   */
  public async register(user: User): Promise<string> {
    const { data } = await this.axios.post("users/register", user);
    const { message } = data;

    return message;
  }

  /**
   * get data profile
   * @param id
   * @return {*}
   */
  public async profile(id: string): Promise<any> {
    const { data } = await this.axios.get(`users/user/${id}`);

    return data;
  }

  /**
   * Re login user
   * @return  {*}
   */
  public async relogin(): Promise<{ user: User; status: boolean }> {
    const dataUser: { user: User; status: boolean } = {
      user: {},
      status: false
    };

    try {
      const { data } = await this.axios.get(`users/verify`);
      const { auth, user }: { auth: boolean; user: User } = data;

      localStorage.setItem("idUser", String(user._id));

      if (auth) dataUser.user = user;
    } catch ({ response }) {
      this.clearToken();
      dataUser.status = true;
    }

    return dataUser;
  }

  /**
   * Logout user
   */
  public async logout(): Promise<void> {
    await this.axios.get(`users/logout`);

    this.clearToken();
  }

  /**
   * Set token
   * @param token
   */
  public setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  /**
   * Set id user in localStorage
   * @param id string
   */
  public setIdUser(id: string): void {
    localStorage.setItem("idUser", id);
  }

  /**
   * Clear token
   */
  public clearToken(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
  }
}
