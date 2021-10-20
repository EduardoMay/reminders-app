export default class User {
  public name = '';
  public email = '';
  public password = '';
  public replyPassword = '';
  public messageError = '';
  public token = '';

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

  public get restorePasswordData() {
    return {
      token: this.token,
      password: this.password,
    }
  }

  public set loadToken(token: string) {
    this.token = token
  }

  public validateLogin(): boolean {
    return this.email === '' || this.password === '';
  }

  public validateRegister(): boolean {
    if (this.email === '' || this.password === '' || this.replyPassword === '')
      this.messageError = 'Favor de llenar todos los campos';
    else if (!this.validateEmail())
      this.messageError = 'Ingresa un correo valido';
    else if (this.password !== this.replyPassword)
      this.messageError = 'Las contraseñas no coinciden';
    else this.messageError = '';

    return this.messageError === '';
  }

  public validateEmail(): boolean {
    const emailPatter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPatter.test(this.email))
      this.messageError = 'Ingrese un correo valido';

    return emailPatter.test(this.email);
  }

  public validatePassword(): boolean {
    if (this.password !== this.replyPassword) this.messageError = 'Las contraseñas no coinciden'

    return this.password === this.replyPassword;
  }

  public load(data: any) {
    this.user = data;
  }
}
