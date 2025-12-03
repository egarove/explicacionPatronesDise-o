import IHttpStrategy from '../Interfaces/HttpInterface';

export default class HttpClient {
  private static instance: HttpClient;
  private strategy!: IHttpStrategy;

  private constructor() {}

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  // cambiar de estrategia
  public setStrategy(strategy: IHttpStrategy) {
    this.strategy = strategy;
  }

  public get(url: string) {
    if (!this.strategy) throw new Error('Strategy no definida');
    return this.strategy.get(url);
  }

  public post(url: string, data: any) {
    if (!this.strategy) throw new Error('Strategy no definida');
    return this.strategy.post(url, data);
  }
}