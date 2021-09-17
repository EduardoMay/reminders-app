import { PriorityInterface } from '@/interfaces/Priority';

export default class Priority {
  public _id: string;
  public id_user: string;
  public title: string;
  public color: string;

  constructor(priority?: PriorityInterface) {
    this._id = priority?._id || '';
    this.id_user = priority?.id_user || '';
    this.title = priority?.title || '';
    this.color = priority?.color || '';
  }

  public set priority(priority: PriorityInterface) {
    this._id = priority._id || '';
    this.id_user = priority.id_user || '';
    this.title = priority.title || '';
    this.color = priority.color || '';
  }

  public load(priority: PriorityInterface) {
    this.priority = { ...priority };
  }
}
