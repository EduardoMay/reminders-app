import { PriorityInterface } from '@/interfaces/Priority';
import Model from './Model';

export default class Priority extends Model {
  public title = '';
  public color = '';

  public get data() {
    return {
      id: this.id,
      idUser: this.idUser,
      title: this.title,
      color: this.color
    };
  }

  public get dataUpdate() {
    return {
      id: this.id,
      title: this.title,
      color: this.color
    };
  }

  public set priority(priority: any) {
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
