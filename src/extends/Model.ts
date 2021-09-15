export default class Model {
  private _idUser = '';

  constructor() {
    this.idUser = localStorage.idUser || '';
  }

  public set idUser(idUser: string) {
    this._idUser = idUser;
  }

  public get idUser() {
    return this._idUser;
  }
}
