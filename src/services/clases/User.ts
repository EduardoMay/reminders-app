// import { UserInterface } from '@/interfaces/User';

export default class User {
  public email = '';
  public password = '';
  public name = '';

  public get user() {
    return {
      email: this.email,
      password: this.password,
      name: this.name
    };
  }

  public validateLogin(): boolean {
    return this.email === '' || this.password === '';
  }
}
