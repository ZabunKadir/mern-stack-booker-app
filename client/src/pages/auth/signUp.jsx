import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

import ErrorMessage from "../../components/card/errorCard";
import Layout from "../../components/layout";

import useLogin from "./hooks/useLogin";
const initialState = { name: "", surname: "", email: "", password: "" };
const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const { register, error } = useLogin();
  const [checkBox, setCheckBox] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkBox) {
      setCheckBoxError(null);
      register(formData);
    } else {
      setCheckBoxError("Please aggre Terms of service");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Layout>
      <div className="SignUp">
        <div className="SignUp-user">
          <div className="SignUp-with-hr">
            <hr />
            <span className="SignUp-with-hr-label">REGISTER</span>
          </div>
          <Form className="SignUp-user-form">
            <div>
              {error && (
                <ErrorMessage variant="danger">
                  {error.response.data.message}
                </ErrorMessage>
              )}
              {checkBoxError && (
                <ErrorMessage variant="warning">{checkBoxError}</ErrorMessage>
              )}
            </div>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="surname">Surname:</Label>
              <Input
                type="text"
                name="surname"
                id="surname"
                onChange={handleChange}
              />
            </FormGroup>

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
              <div className="SignUp-terms">
                <input
                  type="checkbox"
                  className="SignUp-terms-checkbox"
                  onChange={() => setCheckBox(!checkBox)}
                ></input>
                <Label className="SignUp-terms-label">
                  I aggre all statements in <a href="ased">Terms of service</a>
                </Label>
              </div>
            </FormGroup>
            <button
              className="SignUp-button"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <Label className="SignUp-label">
              Have already an account?
              <a href="/signIn"> Sign In</a>
            </Label>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
export default SignUp;
