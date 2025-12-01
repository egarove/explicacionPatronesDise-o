import axios, { AxiosInstance } from 'axios';
import IHttpStrategy from './IHttpStrategy';

export default class AxiosStrategy implements IHttpStrategy {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  async get(url: string) {
    return this.axiosInstance.get(url).then(res => res.data);
  }

  async post(url: string, data: any) {
    return this.axiosInstance.post(url, data).then(res => res.data);
  }
}