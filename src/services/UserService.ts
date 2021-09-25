import Model from '@/extends/Model';
import Axios from '@/hook/Axios';
import { UserRoutesApi } from '@/services/routes/user.routes';
import { UserInterface } from '@/interfaces/User';

export default class UserService extends Model {
  /**
   * verify token
   */
  public async verifyToken(): Promise<boolean> {
    const _axios = new Axios(this.idUser);
    let status = false;

    try {
      const { data } = await _axios.get(UserRoutesApi.VERIFY);
      const { error, token, message } = data;

      if (!error && message === undefined) {
        this.setToken(token);
        status = true;
      }
    } catch ({ response }) {
      this.clearToken();
      status = false;
    }

    return status;
  }

  /**
   * Login user
   * @param user data user
   */
  public async login(user: UserInterface): Promise<UserInterface | boolean> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.post(UserRoutesApi.LOGIN, user);
    const { error, auth, token, user: dataUser } = data;

    if (error && !auth) return false;

    this.setToken(token);
    this.setIdUser(dataUser._id);

    return dataUser;
  }

  /**
   * Register new user
   * @param user data user
   */
  public async register(user: UserInterface): Promise<Array<any>> {
    const _axios = new Axios(this.idUser);
    const res = await _axios.post(UserRoutesApi.REGISTER, user);
    const { error, message } = res.data;

    return [error, message];
  }

  /**
   * get data profile
   * @param id id user
   */
  public async profile(id: string): Promise<UserInterface | boolean> {
    const _axios = new Axios(this.idUser);
    const res = await _axios.get(`${UserRoutesApi.GET_USER}/${id}`);
    const { error, data } = res.data;

    if (error) return false;

    return data;
  }

  /**
   * Re login user
   */
  public async relogin(): Promise<UserInterface | boolean> {
    const _axios = new Axios(this.idUser);

    try {
      const { data } = await _axios.get(UserRoutesApi.VERIFY);
      const { error, user } = data;

      localStorage.setItem('idUser', String(user.id));

      if (error) return false;

      return user;
    } catch ({ response }) {
      this.clearToken();
      return false;
    }
  }

  /**
   * Logout user
   */
  public async logout(): Promise<void> {
    const _axios = new Axios(this.idUser);
    await _axios.get(UserRoutesApi.LOGOUT);

    this.clearToken();
  }

  /**
   * Set token
   * @param token
   */
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Set id user in localStorage
   * @param id string
   */
  public setIdUser(id: string): void {
    localStorage.setItem('idUser', id);
  }

  /**
   * Clear token
   */
  public clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
  }
}
