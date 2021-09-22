import React, { useRef, useState } from "react";
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

  // the ListGroupItemFormGroup component :P
  const LGIFG = ({ children, itemProps, formGroupProps, ...props }) => (
    <ListGroupItem {...props} {...itemProps}>
      <FormGroup {...props} {...formGroupProps}>
        {children}
      </FormGroup>
    </ListGroupItem>
  );

  return (
    <>
      <AccordionGroup
        activeAccordionName={isLogin ? "login" : "register"}
        onChange={toggleLogin}
      >
        <Accordion heading="Login" name="login">
          <ListGroup>
            <LGIFG>
              <Label>Username</Label>
              <Input type="text" />
            </LGIFG>
            <LGIFG>
              <Label>Password</Label>
              <Input type="text" />
            </LGIFG>
            <ListGroupItem>
              <Button>Login</Button>
            </ListGroupItem>
          </ListGroup>
        </Accordion>
        <Accordion heading="Register" name="register">
          <ListGroup>
            <LGIFG>
              <Label>First Name</Label>
              <Input type="text" />
            </LGIFG>
            <LGIFG>
              <Label>Last Name</Label>
              <Input type="text" />
            </LGIFG>
            <LGIFG>
              <Label>Email</Label>
              <Input type="text" />
            </LGIFG>
            <LGIFG>
              <Label>Username</Label>
              <Input type="text" />
            </LGIFG>
            <LGIFG>
              <Label>Password</Label>
              <Input type="password" />
            </LGIFG>
            <LGIFG>
              <Label>Confirm Password</Label>
              <Input type="password" />
            </LGIFG>
            <ListGroupItem>
              <Button>Register</Button>
            </ListGroupItem>
          </ListGroup>
        </Accordion>
      </AccordionGroup>
    </>
  );
};
