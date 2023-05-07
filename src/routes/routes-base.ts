import { StringIndexable } from "../model/common.model";

export const routesBase: StringIndexable<RouteItemBase> = {
  home: {
    path: '/',
    dataSource: 'https://jsonplaceholder.typicode.com/todos/1',
  },
  user: {
    path: '/:id',
    dataSource: 'https://jsonplaceholder.typicode.com/users/$id',
  },
  notFound: {
    path: '*',
  },
};

interface RouteItemBase {
  path: string;
  dataSource?: string;
}
