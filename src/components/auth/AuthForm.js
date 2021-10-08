import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  Accordion as ACCORDION,
  AccordionGroup as ACCORDION_GROUP,
  Form as FORM,
  FormGroup,
  Input,
  Button,
} from "@bootstrap-styled/v4";
import { AuthContext } from "./AuthProvider.js";
import { isNobody } from "../../utils/auth.js";
import { RippleBackground } from "../../utils/animation.js";

export const AuthForm = (props) => {
  const { doLogin, doLogout, doRegister } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin(!isLogin);
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // look at login state one key at a time
    // 	- if a field is empty (remember: "" is falsy),
    // 		the reducer will return allFieldsValid
    // 	- allFieldsValid starts as true (also falsy)
    // 	- whole statement evaluates to true if all entries in loginState are truthy
    // 	- alt explanation:
    // 		- if any value in loginState is falsy...
    // 		- allFieldsValid will end up false...
    // 		- which will cause all other returns to be false
    if (
      Object.keys(loginState).reduce(
        (allFieldsValid, key) => !!loginState[key] && allFieldsValid,
        true
      )
    ) {
      setIsLoading(true);
      doLogin(loginState.username, loginState.password).then(() => {
        setLoginState({ username: "", password: "" });
        setIsLoading(false);
      });
    } else {
      // inputs invalid
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      Object.keys(registerState).reduce(
        (allFieldsValid, key) => !!registerState[key] && allFieldsValid,
        true
      ) &&
      registerState.password === registerState.confirm
    ) {
      setIsLoading(true);
      doRegister(
        registerState.username,
        registerState.password,
        registerState.email,
        registerState.firstName,
        registerState.lastName
      ).then(() => {
        setLoginState({ username: "", password: "" });
        setIsLoading(false);
      });
    } else {
      // inputs invalid
    }
  };

  const [registerState, setRegisterState] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirm: "",
  });

  return (
    isNobody() && (
      <AccordionGroup activeAccordionName={isLogin ? "login" : "register"}>
        <Accordion
          showRipple={isLoading}
          heading={<div onClick={toggleLogin}>Login</div>}
          name="login"
        >
          <Form>
            <FormGroup showRipple={isLoading}>
              <Input
                required
                placeholder="Username"
                type="text"
                onChange={(e) => {
                  const copy = { ...loginState };
                  copy.username = e.target.value;
                  setLoginState(copy);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  const copy = { ...loginState };
                  copy.password = e.target.value;
                  setLoginState(copy);
                }}
              />
            </FormGroup>
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Accordion>
        <Accordion
          showRipple={isLoading}
          heading={<div onClick={toggleLogin}>Register</div>}
          name="register"
        >
          <Form>
            <FormGroup>
              <Input
                required
                placeholder="First Name"
                type="text"
                onChange={(e) => {
                  const copy = { ...registerState };
                  copy.firstName = e.target.value;
                  setRegisterState(copy);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                placeholder="Last Name"
                type="text"
                onChange={(e) => {
                  const copy = { ...registerState };
                  copy.lastName = e.target.value;
                  setRegisterState(copy);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                placeholder="Email"
                type="text"
                onChange={(e) => {
                  const copy = { ...registerState };
                  copy.email = e.target.value;
                  setRegisterState(copy);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                placeholder="Username"
                type="text"
                onChange={(e) => {
                  const copy = { ...registerState };
                  copy.username = e.target.value;
                  setRegisterState(copy);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  const copy = { ...registerState };
                  copy.password = e.target.value;
                  setRegisterState(copy);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => {
                  const copy = { ...registerState };
                  copy.confirm = e.target.value;
                  setRegisterState(copy);
                }}
              />
            </FormGroup>
            <Button onClick={handleRegister}>Register</Button>
          </Form>
        </Accordion>
      </AccordionGroup>
    )
  );
};

const Form = styled(FORM)`
  ${({ showRipple }) => showRipple && RippleBackground()}
  padding: ${(props) => props.theme["$spacer"]};
`;

const Accordion = styled(ACCORDION)`
  ${({ showRipple }) => showRipple && RippleBackground()}
`;

const AccordionGroup = styled(ACCORDION_GROUP)`
  padding: ${(props) => props.theme["$spacer-halved"]};
`;
