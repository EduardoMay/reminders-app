import Model from '@/extends/Model';
import Axios from '@/hook/Axios';
import { UserRoutesApi } from '@/hook/user.routes';
import { User } from '@/interfaces/User';

export default class UserService extends Model {
  /**
   * verify token
   */
  public async verifyToken(): Promise<boolean> {
    const _axios = new Axios(this.idUser);
    let status = false;

    try {
      const { data } = await _axios.get(UserRoutesApi.VERIFY);
      const { auth, token } = data;

      if (auth) {
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
  public async login(user: User): Promise<User | boolean> {
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
  public async register(user: User): Promise<string> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.post(UserRoutesApi.REGISTER, user);
    const { message } = data;

    return message;
  }

  /**
   * get data profile
   * @param id id user
   */
  public async profile(id: string): Promise<any> {
    const _axios = new Axios(this.idUser);
    const { data } = await _axios.get(`${UserRoutesApi.GET_USER}/${id}`);

    return data;
  }

  /**
   * Re login user
   */
  public async relogin(): Promise<{ user: User; status: boolean }> {
    const _axios = new Axios(this.idUser);
    const dataUser: { user: User; status: boolean } = {
      user: {},
      status: false
    };

    try {
      const { data } = await _axios.get(UserRoutesApi.VERIFY);
      const { auth, user }: { auth: boolean; user: User } = data;

      localStorage.setItem('idUser', String(user._id));

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
