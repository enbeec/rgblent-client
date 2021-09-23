import React, { useEffect, useContext, useState } from "react";
import {
  Card,
  CardHeader,
  Accordion,
  AccordionGroup,
} from "@bootstrap-styled/v4";
import { Scroll } from "./reusable/Scroll.js";
import { PaletteCard } from "./reusable/PaletteCard.js";
import { UserColorCard } from "./reusable/UserColorCard.js";
import { AuthContext } from "./AuthProvider.js";
import { authFetch } from "../utils/fetch.js";

export const OtherUsers = ({ ...props }) => {
  const { profile } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const clickFuncMaker = (name) => () => {
    userName === name ? setUserName("") : setUserName(name);
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    authFetch("/users")
      .then((res) => res.json())
      .then(setUsers);
  }, [profile]);

  const userIsEmpty = (user) =>
    user?.colors.length + user?.palettes.length === 0;

  return (
    <AccordionGroup activeAccordionName={userName}>
      {users &&
        users.map((user, i) =>
          user.name !== profile?.name && !userIsEmpty(user) ? (
            user && (
              <Card key={user.name}>
                <Accordion
                  heading={
                    <CardHeader onClick={clickFuncMaker(user.username)}>
                      {user.name}
                    </CardHeader>
                  }
                  name={user.username}
                >
                  {user.palettes.map((palette) => (
                    <PaletteCard key={palette.name} palette={palette} />
                  ))}
                  <UserColorCard colors={user.colors} />
                </Accordion>
              </Card>
            )
          ) : (
            <></>
          )
        )}
    </AccordionGroup>
  );
};
