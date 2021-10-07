import React, { useEffect, useContext, useState } from "react";
import {
  Card,
  CardHeader,
  Accordion,
  AccordionGroup,
} from "@bootstrap-styled/v4";
import { useQuery } from "react-query";
import { MiniPalette } from "./MiniPalette.js";
import { AuthContext } from "../auth/AuthProvider.js";
import { authFetch } from "../../utils/fetch.js";

export const OtherUsers = (props) => {
  const { profile } = useContext(AuthContext);
  const users = useQuery(
    "users",
    () => authFetch("/users").then((res) => res.json()),
    { noAuth: true }
  );

  return (
    users.isFetching || (
      <Card>
        {users.data.map((u) => {
          if (!u.colors.length || !u.palettes.length) return null;
          if (u.id === profile?.data.id) return null;
          return (
            <Card>
              <CardHeader>{u.name}</CardHeader>
              {u.palettes.map((p) => (
                <MiniPalette palette={p} />
              ))}
            </Card>
          );
        })}
      </Card>
    )
  );
};
