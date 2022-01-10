import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signIn, signUp } from "../../../store/auth";
import { useState, useEffect } from "react";
const LoginHooks = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const history = useHistory();
  const login = async (formData) => {
    await dispatch(signIn(formData));
  };
  const register = async (formData) => {
    await dispatch(signUp(formData));
  };
  useEffect(() => {
    if (localStorage.getItem("profile") != null) {
      history.push("/");
    } else {
      return;
    }
  }, [localStorage.getItem("profile")]);
  return {
    login,
    register,
    user,
    loading,
    error,
  };
};

export default LoginHooks;
