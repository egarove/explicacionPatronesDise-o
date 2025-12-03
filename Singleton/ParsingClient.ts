import { Animal } from "../entities/Animal";
import { IParsingStrategy } from "../Interfaces/ParsingInterface";

export default class ParsingClient {
  private static instance: ParsingClient;
  private strategy!: IParsingStrategy;

  private constructor() {}

  public static getInstance(): ParsingClient {
    if (!this.instance) {
      this.instance = new ParsingClient();
    }
    return this.instance;
  }

  // cambiar de estrategia
  public setStrategy(strategy: IParsingStrategy) {
    this.strategy = strategy;
  }

  public parse(rawData: string) : Animal[] {
    if (!this.strategy) throw new Error('Strategy no definida');
    return this.strategy.parse(rawData);
  }

}