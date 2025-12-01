import IHttpStrategy from './IHttpStrategy';

export default class FetchStrategy implements IHttpStrategy {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(url: string) {
    const response = await fetch(this.baseURL + url);
    return response.json();
  }

  async post(url: string, data: any) {
    const response = await fetch(this.baseURL + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}