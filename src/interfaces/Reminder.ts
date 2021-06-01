import { Priority } from "./Priority";

export interface Reminder {
  _id?: string;
  id_user: string;
  title: string;
  description: string;
  date_reminder: any;
  priority?: Priority;
  tags?: Array<any>;
  createdAt?: string;
}

export class ReminderImpl implements Reminder {
  createdAt: string;
  date_reminder: any;
  description: string;
  _id: string;
  id_user: string;
  priority: Priority;
  tags: Array<any>;
  title: string;

  constructor(
    id = "",
    date_reminder = "",
    description = "",
    createdAt = "",
    id_user = "",
    title = "",
    priority = {
      id_user: "",
      title: "",
      color: ""
    }
  ) {
    this._id = id;
    this.date_reminder = date_reminder;
    this.description = description;
    this.createdAt = createdAt;
    this.id_user = id_user;
    this.priority = priority;
    this.tags = [];
    this.title = title;
  }
}
