export default class Model {
  private _idUser = '';

  constructor() {
    this.idUser = localStorage.idUser || '';
  }

  public set idUser(idUser: string) {
    this._idUser = localStorage.idUser || idUser;
  }

  public get idUser() {
    return localStorage.idUser || this._idUser;
  }
}
