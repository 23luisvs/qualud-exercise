import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import Menu from "../components/Menu";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Users from "../pages/users/Users";
import { useAuth } from "../store/AuthContext";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  return (
    <>
      {user && <Menu />}
      <IonRouterOutlet id="main-content">
        {/* Main routes */}
        <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/home">
          <Home />
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
