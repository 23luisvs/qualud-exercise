import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import Menu from "../components/Menu";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Users from "../pages/users/Users";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Menu />
      <IonRouterOutlet id="main-content">
        {/* Main routes */}
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        {/*Routes for users */}
        <Route exact path="/users">
          <Users />
        </Route>
        <Route component={NotFound} />
      </IonRouterOutlet>
    </>
  );
};

export default AppRoutes;
