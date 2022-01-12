import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Menu from './component/Menu/Menu';
import Page404 from './component/Page404/index';
import modules from './modules';
import { useEffect, useState, useCallback } from 'react';


function App() {

  const [routes, setRoutes] = useState(null);

  const renderRoutes = useCallback(() => {
    if (routes) {
      return;
    }

    let _routes = Object.keys(modules).map((item) => (
      <Route key={`route_${item}`} exact path={item} component={withRouter(modules[item])} />
    ));

    setRoutes(_routes);
  }, [routes]);

  useEffect(() => {
    renderRoutes();
  }, [renderRoutes]);


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Contact Details
        </p>
      </header>
      <Menu />
      <Switch>
        {routes}
        <Route component={Page404} />
      </Switch>

    </div>
  );
}

export default App;
