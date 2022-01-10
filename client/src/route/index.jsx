import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../pages/home/home";
import SignIn from "../pages/auth/signIn.jsx";
import SignUp from "../pages/auth/signUp.jsx";
import NotFound from "../pages/notFound.jsx";
import BookPage from "../pages/book/bookPage";
import Profile from "../pages/profile/profile";
const AppRouter = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isSignIn, setIsSignIn] = useState(false);
  useEffect(() => {
    if (user) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  }, []);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          {!isSignIn ? (
            <>
              <Switch>
                <Route path="/signIn" component={SignIn} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/books/:id" component={BookPage} />
                <Route path="/profile/:id" component={Profile} />
                <Route path="*" component={NotFound} />
              </Switch>
            </>
          ) : null}
          <Route path="/books/:id" component={BookPage} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
