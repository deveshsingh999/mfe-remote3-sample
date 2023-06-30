export interface StringIndexable<T = any> {
  [key: string]: T;
}

export interface GenericRequest {
  url: string;
  path: string;
  route?: { path: string };
  query?: StringIndexable<any>;
  params?: any;
  baseUrl?: string;
}
