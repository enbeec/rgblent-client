import React, { useState } from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionGroup,
  Form,
  FormGroup,
  Input,
  Button,
  Card as CARD,
} from "@bootstrap-styled/v4";

export const Auth = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin(!isLogin);
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // look at login state one key at a time
    // 	- if a field is empty (remember: "" is falsy), the reducer will return allFieldsValid
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
      // inputs valid
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
      // inputs valid
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
    <>
      <AccordionGroup activeAccordionName={isLogin ? "login" : "register"}>
        <Accordion
          heading={<div onClick={toggleLogin}>Login</div>}
          name="login"
        >
          <Card>
            <Form>
              <FormGroup>
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
          </Card>
        </Accordion>
        <Accordion
          heading={<div onClick={toggleLogin}>Register</div>}
          name="register"
        >
          <Card>
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
              <Button>Register</Button>
            </Form>
          </Card>
        </Accordion>
      </AccordionGroup>
    </>
  );
};

const Card = styled(CARD)`
  padding: 1rem;
`;
