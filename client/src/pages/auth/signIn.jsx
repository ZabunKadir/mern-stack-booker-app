import { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

import Layout from "../../components/layout";
import ErrorMessage from "../../components/card/errorCard";

import useLogin from "./hooks/useLogin";
const initialState = { email: "", password: "" };
const SignIn = () => {
  const [formData, setFormData] = useState(initialState);
  const { login, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="SignIn">
        <div className="SignIn-user">
          <div className="SignIn-with-hr">
            <hr />
            <span className="SignIn-with-hr-label">LOGIN</span>
          </div>
          <Form className="SignIn-user-form">
            <div>
              {error && (
                <ErrorMessage variant="danger">
                  {error.response.data.message}
                </ErrorMessage>
              )}
            </div>
            <FormGroup>
              <Label for="email">E-Mail:</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <a href="/" className="forgot">
                Forgot your password?
              </a>
            </FormGroup>
            <button
              className="SignIn-button"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
            <Label className="SignIn-any-account">
              Don't have an account?
              <a href="/signUp">Sign Up</a>
            </Label>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
export default SignIn;
