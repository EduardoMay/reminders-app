export interface Reminder {
  id_user: string;
  title: string;
  description: string;
  date_reminder: any;
  priority: object;
  tags: Array<any>;
}
