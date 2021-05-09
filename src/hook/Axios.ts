import axios, { AxiosResponse } from "axios";

/**
 * Usar todos los métodos http utilizando la librería de axios
 */
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
   * @param   {String}  endpoint Ruta de la API
   * @param   {Object}  [params] parámetros de la ruta
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
   * @param   {String}  endpoint Ruta de la API
   * @param   {Object}  body Datos a enviar
   * @returns   {Promise<AxiosResponse>}
   */
  public async post(endpoint: string, body: object): Promise<AxiosResponse> {
    return await axios.post(`${this.URL_API}/${endpoint}`, body);
  }

  /**
   * Method DELETE
   * @param   {String}  endpoint Ruta de la API
   * @param   {Object}  body Datos a enviar
   * @returns  {Promise<AxiosResponse>}
   */
  public async delete(endpoint: string, id: string): Promise<AxiosResponse> {
    return await axios.delete(`${this.URL_API}/${endpoint}/${id}`);
  }

  /**
   * Method PUT
   * @param   {String}  endpoint Ruta de la API
   * @param   {String}  id id del datos
   * @param   {Object}  data datos actualizados
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
