export interface Priority {
  _id?: string;
  id_user: string;
  title: string;
  color: string;
}

export interface DataPriority {
  data: Priority;
}
