export default interface IHttpStrategy {
  tipo : String
  get(url: string): Promise<any>;
  post(url: string, data: any): Promise<any>;
}