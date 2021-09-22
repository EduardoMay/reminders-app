import { PriorityInterface } from '@/interfaces/Priority';
import Model from './Model';

export default class Priority extends Model {
  public id_user = '';
  public title = '';
  public color = '';

  public get data() {
    return {
      idUser: this.idUser,
      title: this.title,
      color: this.color
    };
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
