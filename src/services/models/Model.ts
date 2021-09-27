export default class Model {
  private _id = '';
  private _idUser = '';

  constructor() {
    this.idUser = localStorage.idUser || '';
  }

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get idUser() {
    return localStorage.idUser || this._idUser;
  }

  public set idUser(idUser: string) {
    this._idUser = localStorage.idUser || idUser;
  }
}
