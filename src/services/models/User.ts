export default class User {
  public name = '';
  public email = '';
  public password = '';
  public replyPassword = '';

  public get user() {
    return {
      name: this.name,
      email: this.email,
      password: this.password
    };
  }

  public set user(user) {
    this.email = user.email;
    this.name = user.name;
  }

  public validateLogin(): boolean {
    return this.email === '' || this.password === '';
  }

  public validateRegister(): boolean {
    return (
      this.email === '' || this.password === '' || this.replyPassword === ''
    );
  }

  public validateEmail(): boolean {
    const emailPatter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailPatter.test(this.email);
  }

  public validatePassword(): boolean {
    return this.password !== this.replyPassword;
  }

  public load(data: any) {
    this.user = data;
  }
}
