export default class Model {
  private _id = '';
  private _idUser = '';

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get idUser() {
    return this._idUser;
  }

  public set idUser(idUser: string) {
    this._idUser = idUser;
  }
}
