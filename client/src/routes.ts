import Events from './pages/Events';
import Dashboard from './pages/Dashboard';


const routes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/events",
    component: Events,
  },
];

export default routes;
