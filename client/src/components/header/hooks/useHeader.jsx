import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";

export default function useHeader() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const menu = [
    { key: "homepage", title: "Home", url: "/" },
    { key: "signIn", title: "Sign In", url: "/signIn" },
    { key: "signUp", title: "Sign Up", url: "/signUp" },
  ];

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.removeItem("profile");
    setUser(null);
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      history.push("/");
    }
  };
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const profile = async (user) => {
    if (user) {
      history.push("/profile/" + user.result._id);
      window.location.reload();
    } else {
      return;
    }
  };

  return { menu, user, location, toggle, isOpen, logout, profile };
}
