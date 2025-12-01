import axios, { AxiosInstance } from 'axios';
import IHttpStrategy from './IHttpStrategy';

export default class AxiosStrategy implements IHttpStrategy {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  get(url: string) {
    return this.axiosInstance.get(url);
  }

  post(url: string, data: any) {
    return this.axiosInstance.post(url, data);
  }
}