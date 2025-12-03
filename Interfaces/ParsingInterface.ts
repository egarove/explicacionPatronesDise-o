import { Animal } from "../entities/Animal";

export interface IParsingStrategy {
  tipo : String
  parse(rawData: string): Animal[];
}