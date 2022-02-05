import {FC, lazy} from 'react';
import {Route, Switch} from 'react-router-dom';

export enum routesEnum {
  home = "/",
  game = "/game",
}

const routes = [
  {
    path: routesEnum.home,
    exact: true,
    component:
      lazy(() => import("./CountdownPage"))
  },
  {
    path: routesEnum.game,
    //exact: true,
    component: lazy(() => import("./Home")),
  },
];

export const Routes: FC = () => {

  return (
    <Switch>
      {routes.map((route) => (
        <Route path={route.path} key={route.path as string} exact={route.exact} component={route.component}/>
      ))}
    </Switch>
  );
};
