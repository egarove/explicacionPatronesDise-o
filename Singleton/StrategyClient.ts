import IHttpStrategy from '../Strategy/IHttpStrategy';

export default class StrategyClient {
  private static instance: StrategyClient;
  private strategy!: IHttpStrategy;

  private constructor() {}

  public static getInstance(): StrategyClient {
    if (!StrategyClient.instance) {
      StrategyClient.instance = new StrategyClient();
    }
    return StrategyClient.instance;
  }

  // Cambiar estrategia en tiempo de ejecución
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