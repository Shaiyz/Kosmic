import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import MainLayout from "./layout";
import {
  // VideoScreen,
  DashboardScreen,
  LoginScreen,
  VideoScreen,
  VideosScreen,
} from "./views";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Routes = () => {
  const { user } = useSelector((state) => state.auth);

  let routes = (
    <>
      <Route path="/" exact component={LoginScreen} />
      <Redirect from="*" to="/" />
    </>
  );

  if (user) {
    routes = (
      <>
        <Route path="/dashboard" component={DashboardScreen} />
        {/*<Route path="/users" component={UsersScreen} /> */}
        <Route path="/video/:id?" component={VideoScreen} />
        <Route path="/videos" component={VideosScreen} />

        <Redirect from="*" to="/dashboard" />
      </>
    );
  }

  return (
    <BrowserRouter basename="/">
      <MainLayout>
        <Switch>{routes}</Switch>
        <ToastContainer />
      </MainLayout>
    </BrowserRouter>
  );
};

export default Routes;
