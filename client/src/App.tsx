import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import routes from './routes';
import Menu from './components/Menu/Menu';
function App() {
  return (
    <div className="App">
      <Menu />
      <main>
        <Routes>
          {routes.map((route: { path: string; component: FC }) => {
            return (
              <Route
                key={route.path}
                Component={route.component}
                path={route.path}
              />
            );
          })}
        </Routes>
      </main>
    </div>
  );
}

export default App;
