export interface ResponseApiInterface {
  data: any;
  error: boolean;
  message: string;
  details: string;
}

export default class ResponseApi {
  public data: any;
  public error: boolean;
  public message: string;
  public details: any;

  constructor(response: ResponseApiInterface) {
    this.data = response.data;
    this.error = response.error;
    this.message = response.message;
    this.details = response.details;
  }
}
