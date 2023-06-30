import { lazy } from 'react';
import { routesBase } from './routes-base';

const Home = lazy(() => import('../components/Home'));
const User = lazy(() => import('../components/User'));
const NotFound = lazy(() => import('../components/NotFound'));

export const routesList: RouteItem[] = Object.entries(routesBase).map(([routeName, routeItemBase]) => {
  let component: React.ComponentType<any>;
  switch (routeName) {
    case 'home':
      component = Home;
      break;
    case 'user':
      component = User;
      break;    
    default:
      component = NotFound;
      break;
  }

  const routeItem = { ...routeItemBase, component };
  return routeItem;
});

interface RouteItem {
  path: string;
  component: React.ComponentType<any>;
  dataSource?: string;
}
