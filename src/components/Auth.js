import React, { useState } from "react";
import {
  Accordion,
  AccordionGroup,
  FormGroup,
  // FIXME: I should be using Label, but it's undocumented for v4??
  H6 as Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from "@bootstrap-styled/v4";

export const Auth = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin(!isLogin);
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

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
          <ListGroup>
            <ListGroupItem>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    const copy = { ...loginState };
                    copy.username = e.target.value;
                    setLoginState(copy);
                  }}
                />
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    const copy = { ...loginState };
                    copy.password = e.target.value;
                    setLoginState(copy);
                  }}
                />
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <Button>Login</Button>
            </ListGroupItem>
          </ListGroup>
        </Accordion>
        <Accordion
          heading={<div onClick={toggleLogin}>Register</div>}
          name="register"
        >
          <ListGroup>
            <ListGroupItem>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    const copy = { ...registerState };
                    copy.firstName = e.target.value;
                    setRegisterState(copy);
                  }}
                />
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    const copy = { ...registerState };
                    copy.lastName = e.target.value;
                    setRegisterState(copy);
                  }}
                />
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    const copy = { ...registerState };
                    copy.email = e.target.value;
                    setRegisterState(copy);
                  }}
                />
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    const copy = { ...registerState };
                    copy.username = e.target.value;
                    setRegisterState(copy);
                  }}
                />
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    const copy = { ...registerState };
                    copy.password = e.target.value;
                    setRegisterState(copy);
                  }}
                />
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    const copy = { ...registerState };
                    copy.confirm = e.target.value;
                    setRegisterState(copy);
                  }}
                />
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <Button>Register</Button>
            </ListGroupItem>
          </ListGroup>
        </Accordion>
      </AccordionGroup>
    </>
  );
};
