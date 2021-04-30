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
      const { auth } = data;

      if (auth) status = true;
      else status = false;
    } catch ({ response }) {
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
