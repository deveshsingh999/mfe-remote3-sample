import { routesBase } from './routes-base';

const basename = process.env.MFE_NAME ? `/${process.env.MFE_NAME}` : '';

export const dataSourceList: DataSourceItem[] = Object.values(routesBase)
  .filter(route => route.dataSource)
  .map(route => {
    const routePath = route.path === '/' ? '' : route.path;
    return {
      path: `${basename}${routePath}`,
      dataSource: route.dataSource!,
    };
  });

export default dataSourceList;

interface DataSourceItem {
  path: string;
  dataSource: string;
}
