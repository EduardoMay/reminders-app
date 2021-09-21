import { PriorityInterface } from '@/interfaces/Priority';

export default class Priority {
  private _id = '';

  public id_user = '';
  public title = '';
  public color = '';

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public set priority(priority: any) {
    this.id_user = priority.id_user || '';
    this.title = priority.title || '';
    this.color = priority.color || '';
  }

  public load(priority: PriorityInterface) {
    this.priority = { ...priority };
  }

  public validate(): boolean {
    return this.title === '' || this.color === '';
  }
}
