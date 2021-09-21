export interface ResponseApiInterface<Type> {
  data: Type;
  error: boolean;
  message: string;
  details: string;
}

export default class ResponseApi<Type> {
  public data: any;
  public error: boolean;
  public message: string;
  public details: any;

  constructor(response: ResponseApiInterface<Type>) {
    this.data = response.data;
    this.error = response.error;
    this.message = response.message;
    this.details = response.details;
  }
}
