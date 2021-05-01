import Axios from "@/hook/Axios";
import { User } from "@/interfaces/User";

export default class UserService {
  public axios = new Axios();
  readonly BASE_URL_API = process.env.VUE_APP_BASE_URL_API;

  /**
   * Verify token
   * @return  {Promise<boolean>}
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
   * @param   {string}  email
   * @param   {string}  password
   * @return  {*}
   */
  public async login(user: User): Promise<any> {
    return await this.axios.post("users/login", user);
  }

  /**
   * Re login user
   * @return  {User | boolean} user or bolean
   */
  public async relogin(): Promise<User | boolean> {
    let dataUser: User | boolean = { email: "" };

    try {
      const { data } = await this.axios.get(`users/verify`);
      const { auth, user } = data;

      if (auth) {
        dataUser = user;
      } else dataUser = false;
    } catch ({ response }) {
      this.clearToken();
      dataUser = false;
    }

    return dataUser;
  }

  /**
   * Logout user
   * @return  {*}
   */
  public async logout(): Promise<void> {
    await this.axios.get(`users/logout`);

    this.clearToken();
  }

  /**
   * Set token with response of login is true
   * @param   {string}  token
   */
  public setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  /**
   * Clear token
   */
  public clearToken(): void {
    localStorage.removeItem("token");
  }
}
