import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Menu from "../components/Menu";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Users from "../pages/users/Users";
import { useAuth } from "../store/AuthContext";
import { Network } from "@capacitor/network";
import Offline from "../pages/Offline";
import { useEffect, useState } from "react";
import Posts from "../pages/posts/Posts";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const navigate = useHistory();
  const [connected, setConnected] = useState(true);
  //add listener to check network connection when component mount
  useEffect(() => {
    Network.addListener("networkStatusChange", (status) => {
      console.log("Network status changed", status);
      if (status.connected) {
        setConnected(true);
        navigate.replace("/");
      } else {
        setConnected(false);
        navigate.replace("/offline");
      }
    });
  }, [navigate]);
  useEffect(() => {
    if (!user) navigate.replace("/login");
  }, [user, navigate]);

  return (
    <>
      {user && connected && <Menu />}
      <IonRouterOutlet id="main-content">
        {/* Main routes */}
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/offline">
          <Offline />
        </Route>
        {/*Routes for Functional Requirements */}
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route component={NotFound} />
      </IonRouterOutlet>
    </>
  );
};

export default AppRoutes;
