import axios, { AxiosResponse } from "axios";

/** Use module axios */
export default class Axios {
  readonly URL_API = process.env.VUE_APP_BASE_URL_API;
  public TOKEN = localStorage.token ? localStorage.token : "";

  constructor() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: this.TOKEN
    };
    axios.defaults.withCredentials = true;
  }

  /**
   * Method GET
   * @param   {string}  endpoint
   * @param   {object}  params
   * @returns  {Promise<AxiosResponse>}
   */
  public async get(
    endpoint: string,
    params: object = {}
  ): Promise<AxiosResponse> {
    return await axios.get(`${this.URL_API}/${endpoint}`, {
      params
    });
  }

  /**
   * Method POST
   * @param   {string}  endpoint
   * @param   {object}  body
   * @returns   {Promise<AxiosResponse>}
   */
  public async post(endpoint: string, body: object): Promise<AxiosResponse> {
    return await axios.post(`${this.URL_API}/${endpoint}`, body);
  }

  /**
   * Method DELETE
   * @param   {string}  endpoint
   * @param   {string}  id
   * @returns  {Promise<AxiosResponse>}
   */
  public async delete(endpoint: string, id: string): Promise<AxiosResponse> {
    return await axios.delete(`${this.URL_API}/${endpoint}/${id}`);
  }

  /**
   * Method PUT
   * @param {string}  endpoint
   * @param {string}  id
   * @param {object}  data
   * @returns  {Promise<AxiosResponse>}
   */
  public async put(
    endpoint: string,
    id: string,
    data: object
  ): Promise<AxiosResponse> {
    return await axios.put(`${this.URL_API}/${endpoint}/${id}`, data);
  }
}
